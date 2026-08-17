import { describe, expect, test } from "vite-plus/test";

import { hexGridPixelSize } from "./hexGrid";
import {
  convertLength,
  lengthFromKm,
  lengthToKm,
  MIN_VISIBLE_HEX_RADIUS_PX,
  planetHexGridLayout,
  planetHexGridLayoutFromValues,
  planetHexGridUniforms,
  planetUnwrapSize,
  visibleHexRadiusPx,
} from "./planetHexGrid";
import {
  DEFAULT_HEX_SIZE_KM,
  DEFAULT_HEX_SIZE_MI,
  snapRadiusToHexSize,
  snappedRadiusMax,
  snappedRadiusMin,
} from "./planetPresets";

describe("planetHexGrid", () => {
  test("converts miles and kilometers", () => {
    expect(lengthToKm(1, "kilometers")).toBe(1);
    expect(lengthToKm(1, "miles")).toBeCloseTo(1.609344);
    expect(lengthFromKm(1.609344, "miles")).toBeCloseTo(1);
    expect(convertLength(6371, "kilometers", "miles")).toBe(3959);
    expect(convertLength(100, "kilometers", "miles")).toBe(62);
    expect(convertLength(62, "miles", "kilometers")).toBe(100);
    expect(convertLength(100, "kilometers", "kilometers")).toBe(100);
    expect(convertLength(DEFAULT_HEX_SIZE_MI, "miles", "kilometers")).toBe(DEFAULT_HEX_SIZE_KM);
    expect(convertLength(DEFAULT_HEX_SIZE_KM, "kilometers", "miles")).toBe(DEFAULT_HEX_SIZE_MI);
  });

  test("unwraps a sphere as equator by meridian", () => {
    expect(planetUnwrapSize(6371, 6371)).toEqual({
      width: 2 * Math.PI * 6371,
      height: Math.PI * 6371,
    });
  });

  test("unwraps an oblate spheroid with equatorial width and polar height", () => {
    const size = planetUnwrapSize(60268, 54364);
    expect(size.width).toBeCloseTo(2 * Math.PI * 60268);
    expect(size.height).toBeCloseTo(Math.PI * 54364);
    expect(size.width / size.height).toBeGreaterThan(2);
  });

  test("snaps radius to the nearest hex-size multiple", () => {
    expect(snapRadiusToHexSize(6378.137, 100)).toBe(6400);
    expect(snapRadiusToHexSize(6356.752, 100)).toBe(6400);
    expect(snapRadiusToHexSize(6378.137, 10)).toBe(6380);
    expect(snapRadiusToHexSize(6356.752, 10)).toBe(6360);
    expect(snapRadiusToHexSize(6378.137, 1)).toBe(6378);
    expect(snapRadiusToHexSize(12, 100)).toBe(100);
    expect(snapRadiusToHexSize(292, 3)).toBe(291);
    expect(snapRadiusToHexSize(294, 3)).toBe(294);
  });

  test("radius min and max stay on the hex-size grid", () => {
    expect(snappedRadiusMin(3, 1)).toBe(3);
    expect(snappedRadiusMin(100, 1)).toBe(100);
    expect(snappedRadiusMin(0.1, 1)).toBe(1);
    expect(snappedRadiusMax(3, 100_000)).toBe(99_999);
    expect(snappedRadiusMax(100, 100_000)).toBe(100_000);
  });

  test("Earth default-size pointy hexes cover the unwrapped surface", () => {
    const layout = planetHexGridLayout({
      equatorialRadius: 6378.137,
      polarRadius: 6356.752,
      hexSize: DEFAULT_HEX_SIZE_KM,
      gridSize: 32,
      orientation: "pointy",
    });
    expect(layout.cols).toBeGreaterThan(400);
    expect(layout.rows).toBeGreaterThan(200);
    expect(layout.instanceCount).toBe(layout.cols * layout.rows);
    expect(layout.scale).toBeGreaterThan(0);

    const image = hexGridPixelSize(layout.cols, layout.rows, 32, "pointy");
    expect(layout.canvasWidth).toBe(image.width);
    expect(layout.canvasHeight).toBe(image.height);
    expect(image.width).toBe(layout.cols * 32);
    expect(image.height).toBeGreaterThan(0);
    const larger = hexGridPixelSize(layout.cols, layout.rows, 64, "pointy");
    expect(larger.width).toBe(image.width * 2);
  });

  test("canvas size follows grid size and hex quantity", () => {
    const base = planetHexGridLayout({
      equatorialRadius: 6378.137,
      polarRadius: 6356.752,
      hexSize: DEFAULT_HEX_SIZE_KM,
      gridSize: 32,
      orientation: "pointy",
    });
    const largerGrid = planetHexGridLayout({
      equatorialRadius: 6378.137,
      polarRadius: 6356.752,
      hexSize: DEFAULT_HEX_SIZE_KM,
      gridSize: 64,
      orientation: "pointy",
    });
    expect(largerGrid.cols).toBe(base.cols);
    expect(largerGrid.rows).toBe(base.rows);
    expect(largerGrid.canvasWidth).toBe(base.canvasWidth * 2);
    expect(largerGrid.canvasHeight).toBe(base.canvasHeight * 2);

    const coarserHexes = planetHexGridLayout({
      equatorialRadius: 6378.137,
      polarRadius: 6356.752,
      hexSize: DEFAULT_HEX_SIZE_KM * 2,
      gridSize: 32,
      orientation: "pointy",
    });
    expect(coarserHexes.cols).toBeLessThan(base.cols);
    expect(coarserHexes.rows).toBeLessThan(base.rows);
    expect(coarserHexes.canvasWidth).toBeLessThan(base.canvasWidth);
    expect(coarserHexes.canvasHeight).toBeLessThan(base.canvasHeight);
  });

  test("Ceres 3mi pointy hexes at 32px keep the advertised image size", () => {
    const layout = planetHexGridLayoutFromValues({
      unit: "miles",
      equatorialRadius: 300,
      polarRadius: 276,
      hexSize: 3,
      gridSize: 32,
      orientation: "pointy",
      offsetParity: "even",
    });
    expect(layout.instanceCount).toBe(211_050);
    expect(layout.canvasWidth).toBe(20_160);
    expect(layout.canvasHeight).toBe(9_293);
  });

  test("clamps sub-pixel hex radius so the preview can cover a pixel", () => {
    expect(visibleHexRadiusPx(0.1)).toBe(MIN_VISIBLE_HEX_RADIUS_PX);
    const layout = planetHexGridLayout({
      equatorialRadius: 100,
      polarRadius: 100,
      hexSize: 50,
      gridSize: 32,
      orientation: "pointy",
    });
    const tiny = { ...layout, radiusPx: 0.1 };
    const uniforms = planetHexGridUniforms(tiny, 64, 32, "pointy", "even", 0);
    expect(uniforms.radiusNdc[0]).toBeCloseTo((MIN_VISIBLE_HEX_RADIUS_PX * 2) / 64);
    expect(uniforms.radiusNdc[1]).toBeCloseTo((MIN_VISIBLE_HEX_RADIUS_PX * 2) / 32);
  });
});
