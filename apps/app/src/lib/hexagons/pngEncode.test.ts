import { describe, expect, test } from "vite-plus/test";

import { readPngIhdr, StreamingPngEncoder } from "./pngEncode";

describe("pngEncode", () => {
  test("writes a PNG whose IHDR matches the requested size", async () => {
    const width = 3;
    const height = 2;
    const encoder = new StreamingPngEncoder(width, height);
    const rgba = new Uint8Array(width * height * 4);
    rgba.set([255, 0, 0, 255], 0);
    rgba.set([0, 255, 0, 255], 4);
    rgba.set([0, 0, 255, 255], 8);
    rgba.set([255, 255, 0, 255], 12);
    rgba.set([255, 0, 255, 255], 16);
    rgba.set([0, 255, 255, 255], 20);
    await encoder.writeFullWidthRgbaStrip(rgba, height);
    const png = await encoder.finish();
    expect(Array.from(png.slice(0, 8))).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(readPngIhdr(png)).toEqual({ width, height });
  });

  test("records the Ceres output dimensions in IHDR", async () => {
    const width = 20_160;
    const height = 1;
    const encoder = new StreamingPngEncoder(width, height);
    await encoder.writeFullWidthRgbaStrip(new Uint8Array(width * 4), height);
    const png = await encoder.finish();
    expect(readPngIhdr(png)).toEqual({ width, height });
  });
});
