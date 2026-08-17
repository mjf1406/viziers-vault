import { describe, expect, test } from "vite-plus/test";

import { adjacentStepValue, nearestStepValue } from "./number-input-step";

describe("number input step grid", () => {
  test("snaps to min + n * step, matching HTML number validation", () => {
    expect(nearestStepValue(294, 3, 3)).toBe(294);
    expect(nearestStepValue(292, 3, 3)).toBe(291);
    expect(nearestStepValue(293, 3, 3)).toBe(294);
    expect(nearestStepValue(294, 3, 1)).toBe(295);
  });

  test("plus and minus land on the next valid step, even from off-grid values", () => {
    expect(adjacentStepValue(294, 3, 3, 1)).toBe(297);
    expect(adjacentStepValue(294, 3, 3, -1)).toBe(291);
    expect(adjacentStepValue(292, 3, 3, 1)).toBe(294);
    expect(adjacentStepValue(292, 3, 3, -1)).toBe(291);
  });

  test("preserves decimal steps without float drift", () => {
    expect(adjacentStepValue(3, 0.1, 0.1, 1)).toBe(3.1);
    expect(adjacentStepValue(3.1, 0.1, 0.1, -1)).toBe(3);
    expect(nearestStepValue(3.05, 0.1, 0.1)).toBe(3.1);
  });
});
