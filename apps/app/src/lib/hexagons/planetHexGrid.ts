import { hexGridMetrics, hexGridPixelSize, pixelToNdc } from "./hexGrid";
import type { HexGridFormValues, HexOrientation, HexUnit } from "./hexGridFormSchema";
import { snapRadiusToHexSize } from "./planetPresets";

export const KM_PER_MILE = 1.609344;
export const HEX_GRID_BATCH_SIZE = 8192;
/** Sub-pixel hexes won't cover a pixel center; keep a 1px-wide splat so rows still show. */
export const MIN_VISIBLE_HEX_RADIUS_PX = 0.51;

export function visibleHexRadiusPx(radiusPx: number): number {
  return Math.max(radiusPx, MIN_VISIBLE_HEX_RADIUS_PX);
}

export type PlanetUnwrapSize = {
  width: number;
  height: number;
};

export type PlanetHexGridLayout = {
  cols: number;
  rows: number;
  instanceCount: number;
  colSpacingPx: number;
  rowSpacingPx: number;
  originX: number;
  originY: number;
  radiusPx: number;
  scale: number;
  canvasWidth: number;
  canvasHeight: number;
};

export function lengthToKm(value: number, unit: HexUnit): number {
  return unit === "miles" ? value * KM_PER_MILE : value;
}

export function lengthFromKm(km: number, unit: HexUnit): number {
  return unit === "miles" ? km / KM_PER_MILE : km;
}

export function convertLength(value: number, from: HexUnit, to: HexUnit): number {
  if (from === to) return value;
  return Math.round(lengthFromKm(lengthToKm(value, from), to));
}

/**
 * Equirectangular unwrap of an oblate spheroid: equator × meridian.
 * When equatorial and polar radii match, this is a sphere (`2πr` × `πr`).
 */
export function planetUnwrapSize(equatorialRadius: number, polarRadius: number): PlanetUnwrapSize {
  return {
    width: 2 * Math.PI * equatorialRadius,
    height: Math.PI * polarRadius,
  };
}

/**
 * Hex grid covering a planet's unwrapped surface.
 * Canvas size is the bounding box of `cols` × `rows` at `gridSize` pixels.
 * Radii and `hexSize` must use the same unit; `gridSize` is in pixels.
 */
export function planetHexGridLayout(args: {
  equatorialRadius: number;
  polarRadius: number;
  hexSize: number;
  gridSize: number;
  orientation: HexOrientation;
}): PlanetHexGridLayout {
  const equatorialRadius = snapRadiusToHexSize(args.equatorialRadius, args.hexSize);
  const polarRadius = snapRadiusToHexSize(args.polarRadius, args.hexSize);
  const world = planetUnwrapSize(equatorialRadius, polarRadius);
  const worldMetrics = hexGridMetrics(args.hexSize, args.orientation);
  const cols = Math.max(1, Math.ceil(world.width / worldMetrics.colSpacing) + 1);
  const rows = Math.max(1, Math.ceil(world.height / worldMetrics.rowSpacing) + 1);
  const pixel = hexGridMetrics(args.gridSize, args.orientation);
  const canvas = hexGridPixelSize(cols, rows, args.gridSize, args.orientation);
  return {
    cols,
    rows,
    instanceCount: cols * rows,
    colSpacingPx: pixel.colSpacing,
    rowSpacingPx: pixel.rowSpacing,
    originX: pixel.originX,
    originY: pixel.originY,
    radiusPx: pixel.R,
    scale: args.gridSize / args.hexSize,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  };
}

export function planetHexGridLayoutFromValues(value: HexGridFormValues): PlanetHexGridLayout {
  return planetHexGridLayout({
    equatorialRadius: lengthToKm(value.equatorialRadius, value.unit),
    polarRadius: lengthToKm(value.polarRadius, value.unit),
    hexSize: lengthToKm(value.hexSize, value.unit),
    gridSize: value.gridSize,
    orientation: value.orientation,
  });
}

export function planetHexGridUniforms(
  layout: PlanetHexGridLayout,
  canvasWidth: number,
  canvasHeight: number,
  orientation: HexOrientation,
  offsetParity: "even" | "odd",
  instanceOffset: number,
) {
  const radiusPx = visibleHexRadiusPx(layout.radiusPx);
  return {
    radiusNdc: [(radiusPx * 2) / canvasWidth, (radiusPx * 2) / canvasHeight] as [number, number],
    spacingNdc: [
      (layout.colSpacingPx / canvasWidth) * 2,
      -((layout.rowSpacingPx / canvasHeight) * 2),
    ] as [number, number],
    originNdc: pixelToNdc(layout.originX, layout.originY, canvasWidth, canvasHeight),
    cols: layout.cols,
    orientation: orientation === "flat" ? 1 : 0,
    offsetParity: offsetParity === "odd" ? 0 : 1,
    instanceOffset,
  };
}
