import { describe, expect, test } from "vite-plus/test";

import { formatElapsed } from "./formatElapsed";

describe("formatElapsed", () => {
  test("always shows at least MM:SS.x", () => {
    expect(formatElapsed(0)).toBe("00:00.0");
    expect(formatElapsed(340)).toBe("00:00.3");
    expect(formatElapsed(12_400)).toBe("00:12.4");
    expect(formatElapsed(59_999)).toBe("00:59.9");
    expect(formatElapsed(60_000)).toBe("01:00.0");
    expect(formatElapsed(65_000)).toBe("01:05.0");
    expect(formatElapsed(65_400)).toBe("01:05.4");
    expect(formatElapsed(125_000)).toBe("02:05.0");
    expect(formatElapsed(3_599_900)).toBe("59:59.9");
  });

  test("shows H:MM:SS.x from one hour", () => {
    expect(formatElapsed(3_600_000)).toBe("1:00:00.0");
    expect(formatElapsed(3_661_400)).toBe("1:01:01.4");
    expect(formatElapsed(36_000_000)).toBe("10:00:00.0");
  });

  test("clamps invalid values to zero", () => {
    expect(formatElapsed(-12)).toBe("00:00.0");
    expect(formatElapsed(Number.NaN)).toBe("00:00.0");
  });
});
