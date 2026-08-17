import { describe, expect, test } from "vite-plus/test";

import {
  alignBytesPerRow,
  hexGridStripPlan,
  hexRowsForTile,
  layoutOriginForTile,
} from "./hexGridTiles";
import { planetHexGridLayout } from "./planetHexGrid";

describe("hexGridTiles", () => {
  test("aligns copy bytes-per-row to 256", () => {
    expect(alignBytesPerRow(1)).toBe(256);
    expect(alignBytesPerRow(256)).toBe(256);
    expect(alignBytesPerRow(257)).toBe(512);
  });

  test("tiles cover the canvas without gaps or overlap", () => {
    const canvasWidth = 20_160;
    const canvasHeight = 9_293;
    const strips = hexGridStripPlan({
      canvasWidth,
      canvasHeight,
      maxTileDim: 8192,
      maxBufferSize: 256 * 1024 * 1024,
    });
    const covered = new Map<string, number>();
    let maxTileWidth = 0;
    let maxTileHeight = 0;
    for (const strip of strips) {
      for (const tile of strip.tiles) {
        maxTileWidth = Math.max(maxTileWidth, tile.width);
        maxTileHeight = Math.max(maxTileHeight, tile.height);
        expect(tile.width).toBeLessThanOrEqual(8192);
        expect(tile.height).toBeLessThanOrEqual(8192);
        for (let y = tile.y; y < tile.y + tile.height; y++) {
          for (let x = tile.x; x < tile.x + tile.width; x += tile.width - 1 || 1) {
            const key = `${x},${y}`;
            covered.set(key, (covered.get(key) ?? 0) + 1);
          }
        }
      }
    }
    expect(maxTileWidth).toBe(8192);
    expect(strips[0]?.y).toBe(0);
    expect(strips.at(-1)?.y).toBeGreaterThan(0);
    const last = strips.at(-1)?.tiles.at(-1);
    expect(last?.x).toBeGreaterThan(0);
    expect((last?.x ?? 0) + (last?.width ?? 0)).toBe(canvasWidth);
    expect((strips.at(-1)?.y ?? 0) + (strips.at(-1)?.height ?? 0)).toBe(canvasHeight);

    const first = strips[0]?.tiles[0];
    expect(first).toEqual({ x: 0, y: 0, width: 8192, height: strips[0]?.height });
    for (const count of covered.values()) {
      expect(count).toBe(1);
    }
  });

  test("shifts layout origin into tile space", () => {
    const layout = planetHexGridLayout({
      equatorialRadius: 100,
      polarRadius: 100,
      hexSize: 50,
      gridSize: 32,
      orientation: "pointy",
    });
    const tile = { x: 100, y: 40, width: 64, height: 32 };
    const tiled = layoutOriginForTile(layout, tile);
    expect(tiled.originX).toBe(layout.originX - 100);
    expect(tiled.originY).toBe(layout.originY - 40);
    expect(tiled.canvasWidth).toBe(64);
    expect(tiled.canvasHeight).toBe(32);
    expect(tiled.cols).toBe(layout.cols);
  });

  test("row range for a tile includes a one-hex pad", () => {
    const layout = planetHexGridLayout({
      equatorialRadius: 100,
      polarRadius: 100,
      hexSize: 50,
      gridSize: 32,
      orientation: "pointy",
    });
    const { startRow, rowCount } = hexRowsForTile(layout, 0, 32);
    expect(startRow).toBe(0);
    expect(rowCount).toBeGreaterThan(0);
    expect(startRow + rowCount).toBeLessThanOrEqual(layout.rows);
  });
});
