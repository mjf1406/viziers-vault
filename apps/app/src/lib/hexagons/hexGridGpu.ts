import { tgpu, d, std } from "typegpu";

import type { HexGridFormValues } from "@/lib/hexagons/hexGridFormSchema";
import {
  HEX_GRID_BATCH_SIZE,
  planetHexGridLayoutFromValues,
  planetHexGridUniforms,
  type PlanetHexGridLayout,
} from "@/lib/hexagons/planetHexGrid";
import {
  alignBytesPerRow,
  hexGridStripPlan,
  hexRowsForTile,
  layoutOriginForTile,
  type HexGridTile,
} from "@/lib/hexagons/hexGridTiles";
import { StreamingPngEncoder } from "@/lib/hexagons/pngEncode";

const HEX_TRIANGLE_VERTEX_COUNT = 18;
const SQRT3_OVER_2 = Math.sqrt(3) / 2;
const ACCUM_FORMAT = "rgba8unorm" as const;

const HexGridParams = d.struct({
  radiusNdc: d.vec2f,
  spacingNdc: d.vec2f,
  originNdc: d.vec2f,
  cols: d.u32,
  orientation: d.u32,
  offsetParity: d.u32,
  instanceOffset: d.u32,
});

export type HexGridProgressCallback = (drawn: number, total: number) => void;

export type HexGridExecuteResult = {
  png: Uint8Array;
  width: number;
  height: number;
  drawn: number;
  total: number;
  cancelled: boolean;
};

export type HexGridRenderer = {
  executeHexGrid: (
    value: HexGridFormValues,
    options: {
      isCurrent: () => boolean;
      onProgress: HexGridProgressCallback;
    },
  ) => Promise<HexGridExecuteResult>;
};

export async function createHexGridRenderer(): Promise<HexGridRenderer> {
  const root = await tgpu.init();
  const device = root.device;
  const gridParams = root.createUniform(HexGridParams);
  const maxTileDim = device.limits.maxTextureDimension2D;
  const maxBufferSize = device.limits.maxBufferSize;

  const gridPipeline = root.createRenderPipeline({
    primitive: { topology: "triangle-list" },
    targets: { format: ACCUM_FORMAT },
    vertex: ({ $vertexIndex: vid, $instanceIndex: iid }) => {
      "use gpu";

      const positions = [
        d.vec2f(),
        d.vec2f(0, 1),
        d.vec2f(-SQRT3_OVER_2, 0.5),

        d.vec2f(),
        d.vec2f(-SQRT3_OVER_2, 0.5),
        d.vec2f(-SQRT3_OVER_2, -0.5),

        d.vec2f(),
        d.vec2f(-SQRT3_OVER_2, -0.5),
        d.vec2f(0, -1),

        d.vec2f(),
        d.vec2f(0, -1),
        d.vec2f(SQRT3_OVER_2, -0.5),

        d.vec2f(),
        d.vec2f(SQRT3_OVER_2, -0.5),
        d.vec2f(SQRT3_OVER_2, 0.5),

        d.vec2f(),
        d.vec2f(SQRT3_OVER_2, 0.5),
        d.vec2f(0, 1),
      ];

      const cols = gridParams.$.cols;
      const hexIndex = iid + gridParams.$.instanceOffset;
      const col = hexIndex % cols;
      const row = d.u32(hexIndex / cols);
      const two = d.u32(2);

      let staggerX = d.f32(0);
      let staggerY = d.f32(0);
      if (gridParams.$.orientation === d.u32(0)) {
        if (row % two === gridParams.$.offsetParity) {
          staggerX = gridParams.$.spacingNdc.x * 0.5;
        }
      } else {
        if (col % two === gridParams.$.offsetParity) {
          staggerY = gridParams.$.spacingNdc.y * 0.5;
        }
      }

      const center = gridParams.$.originNdc
        .add(d.vec2f(d.f32(col), d.f32(row)).mul(gridParams.$.spacingNdc))
        .add(d.vec2f(staggerX, staggerY));

      let local = d.vec2f(positions[vid]);
      if (gridParams.$.orientation === d.u32(1)) {
        local = d.vec2f(
          local.x * SQRT3_OVER_2 - local.y * 0.5,
          local.x * 0.5 + local.y * SQRT3_OVER_2,
        );
      }

      const checker = (col + row) % two;
      const color = std.select(
        d.vec3f(0.25, 0.7, 0.95),
        d.vec3f(0.12, 0.42, 0.68),
        checker === d.u32(1),
      );

      return {
        $position: d.vec4f(local.mul(gridParams.$.radiusNdc).add(center), 0, 1),
        color,
      };
    },
    fragment: ({ color }) => {
      "use gpu";
      return d.vec4f(color, 1);
    },
  });

  function createTileTarget(width: number, height: number) {
    const tex = root
      .createTexture({
        size: [width, height],
        format: ACCUM_FORMAT,
      })
      .$usage("render");
    return {
      width,
      height,
      tex,
      renderView: tex.createView("render"),
    };
  }

  let tileTarget: ReturnType<typeof createTileTarget> | null = null;
  let readBuffer: GPUBuffer | null = null;
  let readBufferSize = 0;

  function ensureTileTarget(width: number, height: number) {
    if (tileTarget && tileTarget.width === width && tileTarget.height === height) return;
    tileTarget?.tex.destroy();
    tileTarget = createTileTarget(width, height);
  }

  function ensureReadBuffer(size: number) {
    if (readBuffer && readBufferSize >= size) return;
    readBuffer?.destroy();
    readBuffer = device.createBuffer({
      size,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });
    readBufferSize = size;
  }

  async function renderTile(
    layout: PlanetHexGridLayout,
    value: HexGridFormValues,
    tile: HexGridTile,
    isCurrent: () => boolean,
  ): Promise<Uint8Array | null> {
    ensureTileTarget(tile.width, tile.height);
    if (!tileTarget) {
      throw new Error("Hex grid tile target is not ready");
    }
    const tileLayout = layoutOriginForTile(layout, tile);
    const { startRow, rowCount } = hexRowsForTile(layout, tile.y, tile.height);
    const instanceOffset = startRow * layout.cols;
    const instanceCount = rowCount * layout.cols;

    if (instanceCount === 0) {
      gridPipeline
        .withColorAttachment({
          view: tileTarget.renderView,
          loadOp: "clear",
          storeOp: "store",
          clearValue: [0, 0, 0, 1],
        })
        .draw(HEX_TRIANGLE_VERTEX_COUNT, 0);
    } else {
      for (let start = 0; start < instanceCount; start += HEX_GRID_BATCH_SIZE) {
        if (!isCurrent()) return null;
        const count = Math.min(HEX_GRID_BATCH_SIZE, instanceCount - start);
        gridParams.write(
          planetHexGridUniforms(
            tileLayout,
            tile.width,
            tile.height,
            value.orientation,
            value.offsetParity,
            instanceOffset + start,
          ),
        );
        gridPipeline
          .withColorAttachment({
            view: tileTarget.renderView,
            loadOp: start === 0 ? "clear" : "load",
            storeOp: "store",
            clearValue: [0, 0, 0, 1],
          })
          .draw(HEX_TRIANGLE_VERTEX_COUNT, count);
      }
    }

    const bytesPerRow = alignBytesPerRow(tile.width * 4);
    const bufferSize = bytesPerRow * tile.height;
    ensureReadBuffer(bufferSize);
    if (!readBuffer) {
      throw new Error("Hex grid readback buffer is not ready");
    }

    const encoder = device.createCommandEncoder();
    encoder.copyTextureToBuffer(
      { texture: root.unwrap(tileTarget.tex) },
      { buffer: readBuffer, bytesPerRow, rowsPerImage: tile.height },
      { width: tile.width, height: tile.height },
    );
    device.queue.submit([encoder.finish()]);
    await readBuffer.mapAsync(GPUMapMode.READ);
    const mapped = new Uint8Array(readBuffer.getMappedRange(0, bufferSize));
    const packed = new Uint8Array(tile.width * tile.height * 4);
    for (let row = 0; row < tile.height; row++) {
      packed.set(
        mapped.subarray(row * bytesPerRow, row * bytesPerRow + tile.width * 4),
        row * tile.width * 4,
      );
    }
    readBuffer.unmap();
    return packed;
  }

  return {
    async executeHexGrid(value, { isCurrent, onProgress }) {
      const layout = planetHexGridLayoutFromValues(value);
      const { instanceCount, canvasWidth: width, canvasHeight: height } = layout;
      if (instanceCount === 0) {
        onProgress(0, 0);
        return {
          png: new Uint8Array(),
          width,
          height,
          drawn: 0,
          total: 0,
          cancelled: false,
        };
      }

      onProgress(0, instanceCount);
      const strips = hexGridStripPlan({
        canvasWidth: width,
        canvasHeight: height,
        maxTileDim,
        maxBufferSize,
      });
      const pngEncoder = new StreamingPngEncoder(width, height);
      const packedStrip = new Uint8Array(width * strips[0]!.height * 4);
      let completedRows = 0;

      for (const strip of strips) {
        if (!isCurrent()) {
          return {
            png: new Uint8Array(),
            width,
            height,
            drawn: 0,
            total: instanceCount,
            cancelled: true,
          };
        }
        const stripBytes = width * strip.height * 4;
        const stripPixels =
          packedStrip.length >= stripBytes ? packedStrip : new Uint8Array(stripBytes);
        for (const tile of strip.tiles) {
          if (!isCurrent()) {
            return {
              png: new Uint8Array(),
              width,
              height,
              drawn: 0,
              total: instanceCount,
              cancelled: true,
            };
          }
          const tilePixels = await renderTile(layout, value, tile, isCurrent);
          if (!tilePixels) {
            return {
              png: new Uint8Array(),
              width,
              height,
              drawn: 0,
              total: instanceCount,
              cancelled: true,
            };
          }
          for (let row = 0; row < tile.height; row++) {
            stripPixels.set(
              tilePixels.subarray(row * tile.width * 4, (row + 1) * tile.width * 4),
              (row * width + tile.x) * 4,
            );
          }
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 0);
          });
        }
        await pngEncoder.writeFullWidthRgbaStrip(stripPixels, strip.height);
        completedRows += strip.height;
        onProgress(Math.round((instanceCount * completedRows) / height), instanceCount);
      }

      const png = await pngEncoder.finish();
      return { png, width, height, drawn: instanceCount, total: instanceCount, cancelled: false };
    },
  };
}
