import { visibleHexRadiusPx, type PlanetHexGridLayout } from "./planetHexGrid";

export const HEX_GRID_COPY_BYTES_PER_ROW_ALIGNMENT = 256;
export const HEX_GRID_DEFAULT_MAX_STRIP_BYTES = 64 * 1024 * 1024;

export type HexGridTile = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type HexGridStrip = {
  y: number;
  height: number;
  tiles: HexGridTile[];
};

export function alignBytesPerRow(
  unaligned: number,
  alignment = HEX_GRID_COPY_BYTES_PER_ROW_ALIGNMENT,
): number {
  return Math.ceil(unaligned / alignment) * alignment;
}

export function hexGridStripHeight(args: {
  canvasWidth: number;
  canvasHeight: number;
  maxTileDim: number;
  maxBufferSize: number;
  maxStripBytes?: number;
}): number {
  const canvasWidth = Math.max(1, args.canvasWidth);
  const canvasHeight = Math.max(1, args.canvasHeight);
  const maxTileDim = Math.max(1, args.maxTileDim);
  const tileW = Math.min(maxTileDim, canvasWidth);
  const aligned = alignBytesPerRow(tileW * 4);
  const maxRowsByBuffer = Math.max(1, Math.floor(args.maxBufferSize / aligned));
  const maxRowsByMemory = Math.max(
    1,
    Math.floor((args.maxStripBytes ?? HEX_GRID_DEFAULT_MAX_STRIP_BYTES) / (canvasWidth * 4)),
  );
  return Math.min(maxTileDim, canvasHeight, maxRowsByBuffer, maxRowsByMemory);
}

export function hexGridStripPlan(args: {
  canvasWidth: number;
  canvasHeight: number;
  maxTileDim: number;
  maxBufferSize: number;
  maxStripBytes?: number;
}): HexGridStrip[] {
  const canvasWidth = Math.max(1, args.canvasWidth);
  const canvasHeight = Math.max(1, args.canvasHeight);
  const maxTileDim = Math.max(1, args.maxTileDim);
  const stripHeight = hexGridStripHeight(args);
  const strips: HexGridStrip[] = [];
  for (let y = 0; y < canvasHeight; y += stripHeight) {
    const height = Math.min(stripHeight, canvasHeight - y);
    const tiles: HexGridTile[] = [];
    for (let x = 0; x < canvasWidth; x += maxTileDim) {
      tiles.push({
        x,
        y,
        width: Math.min(maxTileDim, canvasWidth - x),
        height,
      });
    }
    strips.push({ y, height, tiles });
  }
  return strips;
}

export function hexRowsForTile(
  layout: PlanetHexGridLayout,
  tileY: number,
  tileHeight: number,
): { startRow: number; rowCount: number } {
  const pad = visibleHexRadiusPx(layout.radiusPx) + layout.rowSpacingPx;
  const startRow = Math.max(0, Math.floor((tileY - layout.originY - pad) / layout.rowSpacingPx));
  const endRow = Math.min(
    layout.rows,
    Math.ceil((tileY + tileHeight - layout.originY + pad) / layout.rowSpacingPx),
  );
  return { startRow, rowCount: Math.max(0, endRow - startRow) };
}

export function layoutOriginForTile(
  layout: PlanetHexGridLayout,
  tile: HexGridTile,
): PlanetHexGridLayout {
  return {
    ...layout,
    originX: layout.originX - tile.x,
    originY: layout.originY - tile.y,
    canvasWidth: tile.width,
    canvasHeight: tile.height,
  };
}
