import { describe, expect, test } from "vite-plus/test";

import { getMoonsOf, PLANET_HOST_PRESETS_BY_SUN_DISTANCE, PLANET_PRESETS } from "./planetPresets";

describe("planetPresets", () => {
  test("hosts are ordered from the Sun outward, Mercury first", () => {
    expect(PLANET_HOST_PRESETS_BY_SUN_DISTANCE.map((preset) => preset.id)).toEqual([
      "mercury",
      "venus",
      "earth",
      "mars",
      "ceres",
      "jupiter",
      "saturn",
      "uranus",
      "neptune",
      "pluto",
      "haumea",
      "makemake",
      "eris",
    ]);
  });

  test("only hosts with natural satellites return moons", () => {
    expect(getMoonsOf("mercury")).toEqual([]);
    expect(getMoonsOf("venus")).toEqual([]);
    expect(getMoonsOf("ceres")).toEqual([]);
    expect(getMoonsOf("earth").map((moon) => moon.id)).toEqual(["moon"]);
    expect(getMoonsOf("mars").map((moon) => moon.id)).toEqual(["phobos", "deimos"]);
    expect(
      PLANET_PRESETS.filter((preset) => preset.kind === "moon").every((moon) =>
        getMoonsOf(moon.parentId).some((child) => child.id === moon.id),
      ),
    ).toBe(true);
  });
});
