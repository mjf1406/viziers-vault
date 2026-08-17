import { fromGridSize } from "./hexagon";
import type { HexOrientation } from "./hexGridFormSchema";

export type HexGridMetrics = {
  colSpacing: number;
  rowSpacing: number;
  originX: number;
  originY: number;
  R: number;
};

/** Center-to-center spacing and the unstaggered origin of hex (0, 0). */
export function hexGridMetrics(gridSize: number, orientation: HexOrientation): HexGridMetrics {
  const hex = fromGridSize(gridSize);
  if (orientation === "pointy") {
    return {
      colSpacing: hex.s,
      rowSpacing: 1.5 * hex.a,
      originX: hex.s / 2,
      originY: hex.R,
      R: hex.R,
    };
  }
  return {
    colSpacing: 1.5 * hex.a,
    rowSpacing: hex.s,
    originX: hex.R,
    originY: hex.s / 2,
    R: hex.R,
  };
}

/** Bounding box of a `cols` × `rows` hex grid at the given pixel grid size. */
export function hexGridPixelSize(
  cols: number,
  rows: number,
  gridSize: number,
  orientation: HexOrientation,
): { width: number; height: number } {
  const hex = hexGridMetrics(gridSize, orientation);
  return {
    width: Math.max(1, Math.round((cols - 1) * hex.colSpacing + 2 * hex.originX)),
    height: Math.max(1, Math.round((rows - 1) * hex.rowSpacing + 2 * hex.originY)),
  };
}

export function pixelToNdc(x: number, y: number, width: number, height: number): [number, number] {
  return [(x / width) * 2 - 1, 1 - (y / height) * 2];
}
