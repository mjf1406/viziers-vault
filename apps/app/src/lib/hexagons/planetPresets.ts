export const PLANET_PRESET_KINDS = ["planet", "dwarf", "moon"] as const;
export type PlanetPresetKind = (typeof PLANET_PRESET_KINDS)[number];

export const PLANET_PRESET_IDS = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "ceres",
  "pluto",
  "haumea",
  "makemake",
  "eris",
  "moon",
  "phobos",
  "deimos",
  "ganymede",
  "callisto",
  "io",
  "europa",
  "carme",
  "titan",
  "rhea",
  "iapetus",
  "dione",
  "tethys",
  "enceladus",
  "titania",
  "oberon",
  "umbriel",
  "ariel",
  "miranda",
  "triton",
  "proteus",
  "nereid",
  "galatea",
  "despina",
] as const;
export type PlanetPresetId = (typeof PLANET_PRESET_IDS)[number];

/** Planets and dwarf planets that can host natural satellites in the picker. */
export const PLANET_HOST_IDS = [
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
] as const;
export type PlanetHostId = (typeof PLANET_HOST_IDS)[number];
export type MoonPresetId = Exclude<PlanetPresetId, PlanetHostId>;

type PlanetPresetRadii<Id extends PlanetPresetId> = {
  id: Id;
  equatorialRadiusKm: number;
  polarRadiusKm: number;
};

export type PlanetHostPreset = PlanetPresetRadii<PlanetHostId> & {
  kind: "planet" | "dwarf";
  /** Semi-major axis (AU), for nearest-the-Sun sorting. */
  semiMajorAxisAu: number;
};

export type MoonPreset = PlanetPresetRadii<MoonPresetId> & {
  kind: "moon";
  parentId: PlanetHostId;
};

export type PlanetPreset = PlanetHostPreset | MoonPreset;

export function isPlanetHostPreset(preset: PlanetPreset): preset is PlanetHostPreset {
  return preset.kind === "planet" || preset.kind === "dwarf";
}

export function isMoonPreset(preset: PlanetPreset): preset is MoonPreset {
  return preset.kind === "moon";
}

/**
 * IAU planets, dwarf planets, then the 24 natural satellites shown on SolSim’s
 * /size page (top moons per planet host, plus Enceladus). Radii from NASA / JPL
 * via solsim’s solar_system_data.json. Host `semiMajorAxisAu` from NASA fact sheets.
 */
export const PLANET_PRESETS: readonly PlanetPreset[] = [
  {
    id: "mercury",
    kind: "planet",
    semiMajorAxisAu: 0.387,
    equatorialRadiusKm: 2439.7,
    polarRadiusKm: 2439.7,
  },
  {
    id: "venus",
    kind: "planet",
    semiMajorAxisAu: 0.723,
    equatorialRadiusKm: 6051.8,
    polarRadiusKm: 6051.8,
  },
  {
    id: "earth",
    kind: "planet",
    semiMajorAxisAu: 1,
    equatorialRadiusKm: 6378.137,
    polarRadiusKm: 6356.752,
  },
  {
    id: "mars",
    kind: "planet",
    semiMajorAxisAu: 1.524,
    equatorialRadiusKm: 3396.2,
    polarRadiusKm: 3376.2,
  },
  {
    id: "ceres",
    kind: "dwarf",
    semiMajorAxisAu: 2.767,
    equatorialRadiusKm: 482.1,
    polarRadiusKm: 445.9,
  },
  {
    id: "jupiter",
    kind: "planet",
    semiMajorAxisAu: 5.203,
    equatorialRadiusKm: 71492,
    polarRadiusKm: 66854,
  },
  {
    id: "saturn",
    kind: "planet",
    semiMajorAxisAu: 9.537,
    equatorialRadiusKm: 60268,
    polarRadiusKm: 54364,
  },
  {
    id: "uranus",
    kind: "planet",
    semiMajorAxisAu: 19.191,
    equatorialRadiusKm: 25559,
    polarRadiusKm: 24973,
  },
  {
    id: "neptune",
    kind: "planet",
    semiMajorAxisAu: 30.069,
    equatorialRadiusKm: 24764,
    polarRadiusKm: 24341,
  },
  {
    id: "pluto",
    kind: "dwarf",
    semiMajorAxisAu: 39.482,
    equatorialRadiusKm: 1188.3,
    polarRadiusKm: 1188.3,
  },
  {
    id: "haumea",
    kind: "dwarf",
    semiMajorAxisAu: 43.18,
    equatorialRadiusKm: 870,
    polarRadiusKm: 482.9,
  },
  {
    id: "makemake",
    kind: "dwarf",
    semiMajorAxisAu: 45.79,
    equatorialRadiusKm: 715,
    polarRadiusKm: 715,
  },
  {
    id: "eris",
    kind: "dwarf",
    semiMajorAxisAu: 67.86,
    equatorialRadiusKm: 1163,
    polarRadiusKm: 1163,
  },
  { id: "moon", kind: "moon", parentId: "earth", equatorialRadiusKm: 1738.1, polarRadiusKm: 1736 },
  { id: "phobos", kind: "moon", parentId: "mars", equatorialRadiusKm: 13, polarRadiusKm: 9.1 },
  { id: "deimos", kind: "moon", parentId: "mars", equatorialRadiusKm: 7.8, polarRadiusKm: 5.6 },
  {
    id: "ganymede",
    kind: "moon",
    parentId: "jupiter",
    equatorialRadiusKm: 2634.5,
    polarRadiusKm: 2631.7,
  },
  {
    id: "callisto",
    kind: "moon",
    parentId: "jupiter",
    equatorialRadiusKm: 2410.3,
    polarRadiusKm: 2410.3,
  },
  {
    id: "io",
    kind: "moon",
    parentId: "jupiter",
    equatorialRadiusKm: 1829.1,
    polarRadiusKm: 1819.4,
  },
  {
    id: "europa",
    kind: "moon",
    parentId: "jupiter",
    equatorialRadiusKm: 1562.1,
    polarRadiusKm: 1559.5,
  },
  {
    id: "carme",
    kind: "moon",
    parentId: "jupiter",
    equatorialRadiusKm: 135.1635,
    polarRadiusKm: 135.1635,
  },
  {
    id: "titan",
    kind: "moon",
    parentId: "saturn",
    equatorialRadiusKm: 2575.15,
    polarRadiusKm: 2574.47,
  },
  { id: "rhea", kind: "moon", parentId: "saturn", equatorialRadiusKm: 765, polarRadiusKm: 762.8 },
  {
    id: "iapetus",
    kind: "moon",
    parentId: "saturn",
    equatorialRadiusKm: 746.1,
    polarRadiusKm: 712.1,
  },
  {
    id: "dione",
    kind: "moon",
    parentId: "saturn",
    equatorialRadiusKm: 562.5,
    polarRadiusKm: 560.3,
  },
  {
    id: "tethys",
    kind: "moon",
    parentId: "saturn",
    equatorialRadiusKm: 536.4,
    polarRadiusKm: 528.2,
  },
  {
    id: "enceladus",
    kind: "moon",
    parentId: "saturn",
    equatorialRadiusKm: 252.3,
    polarRadiusKm: 251.9,
  },
  {
    id: "titania",
    kind: "moon",
    parentId: "uranus",
    equatorialRadiusKm: 788.9,
    polarRadiusKm: 788.9,
  },
  {
    id: "oberon",
    kind: "moon",
    parentId: "uranus",
    equatorialRadiusKm: 761.4,
    polarRadiusKm: 761.4,
  },
  {
    id: "umbriel",
    kind: "moon",
    parentId: "uranus",
    equatorialRadiusKm: 584.7,
    polarRadiusKm: 584.7,
  },
  {
    id: "ariel",
    kind: "moon",
    parentId: "uranus",
    equatorialRadiusKm: 581.1,
    polarRadiusKm: 577.7,
  },
  {
    id: "miranda",
    kind: "moon",
    parentId: "uranus",
    equatorialRadiusKm: 240.4,
    polarRadiusKm: 232.9,
  },
  {
    id: "triton",
    kind: "moon",
    parentId: "neptune",
    equatorialRadiusKm: 1353.4,
    polarRadiusKm: 1353.4,
  },
  { id: "proteus", kind: "moon", parentId: "neptune", equatorialRadiusKm: 218, polarRadiusKm: 208 },
  { id: "nereid", kind: "moon", parentId: "neptune", equatorialRadiusKm: 180, polarRadiusKm: 178 },
  { id: "galatea", kind: "moon", parentId: "neptune", equatorialRadiusKm: 88, polarRadiusKm: 79 },
  { id: "despina", kind: "moon", parentId: "neptune", equatorialRadiusKm: 90, polarRadiusKm: 74 },
];

const EMPTY_MOONS: readonly MoonPreset[] = [];

/** Planets and dwarf planets, nearest the Sun first. */
export const PLANET_HOST_PRESETS_BY_SUN_DISTANCE: readonly PlanetHostPreset[] =
  PLANET_PRESETS.filter(isPlanetHostPreset).toSorted(
    (a, b) => a.semiMajorAxisAu - b.semiMajorAxisAu,
  );

export const PLANET_MOONS_BY_PARENT: ReadonlyMap<PlanetHostId, readonly MoonPreset[]> = (() => {
  const moonsByParent = new Map<PlanetHostId, MoonPreset[]>();
  for (const preset of PLANET_PRESETS) {
    if (!isMoonPreset(preset)) continue;
    const moons = moonsByParent.get(preset.parentId);
    if (moons) {
      moons.push(preset);
    } else {
      moonsByParent.set(preset.parentId, [preset]);
    }
  }
  return moonsByParent;
})();

export function getMoonsOf(parentId: PlanetHostId): readonly MoonPreset[] {
  return PLANET_MOONS_BY_PARENT.get(parentId) ?? EMPTY_MOONS;
}

/** Default Earth equatorial / polar radii (km) from NASA / WGS 84. */
export const DEFAULT_EQUATORIAL_RADIUS_KM = 6378.137;
export const DEFAULT_POLAR_RADIUS_KM = 6356.752;
export const DEFAULT_PLANET_PRESET_ID: PlanetPresetId = "earth";
/** Default hex size in miles. */
export const DEFAULT_HEX_SIZE_MI = 24;
/** Nearest whole kilometer equivalent of `DEFAULT_HEX_SIZE_MI` (24 × 1.609344 ≈ 38.62). */
export const DEFAULT_HEX_SIZE_KM = 39;

/** Equatorial radius in Earth radii, one decimal place (e.g. Jupiter → `"11.2"`). */
export function formatEquatorialRadiusEarthRadii(equatorialRadiusKm: number): string {
  return (equatorialRadiusKm / DEFAULT_EQUATORIAL_RADIUS_KM).toFixed(1);
}

const PRESET_BY_ID = new Map(PLANET_PRESETS.map((preset) => [preset.id, preset]));

export function isPlanetPresetId(value: string): value is PlanetPresetId {
  return PRESET_BY_ID.has(value as PlanetPresetId);
}

export function getPlanetPreset(id: PlanetPresetId): PlanetPreset {
  const preset = PRESET_BY_ID.get(id);
  if (!preset) {
    throw new Error(`Unknown planet preset: ${id}`);
  }
  return preset;
}

function hexSizeDecimalPlaces(hexSize: number): number {
  if (!Number.isFinite(hexSize) || Number.isInteger(hexSize)) return 0;
  const text = hexSize.toString().toLowerCase();
  const scientific = /^(-?\d+(?:\.\d+)?)e-(\d+)$/.exec(text);
  if (scientific) {
    const fraction = scientific[1]?.split(".")[1] ?? "";
    return Math.min(8, Number(scientific[2]) + fraction.length);
  }
  const dot = text.indexOf(".");
  return dot === -1 ? 0 : Math.min(8, text.length - dot - 1);
}

/** Snap a radius to the nearest multiple of `hexSize`. */
export function snapRadiusToHexSize(radius: number, hexSize: number): number {
  if (!Number.isFinite(radius) || !Number.isFinite(hexSize) || hexSize <= 0) {
    return radius;
  }
  const snapped = Math.round(radius / hexSize) * hexSize;
  const decimals = hexSizeDecimalPlaces(hexSize);
  const rounded = Number(snapped.toFixed(decimals));
  if (!Number.isFinite(rounded) || rounded <= 0) {
    return Number(hexSize.toFixed(decimals));
  }
  return rounded;
}

/** Smallest hex-size multiple that is at least `minRadius`. */
export function snappedRadiusMin(hexSize: number, minRadius: number): number {
  if (!Number.isFinite(hexSize) || hexSize <= 0 || !Number.isFinite(minRadius)) {
    return minRadius;
  }
  return snapRadiusToHexSize(Math.ceil(minRadius / hexSize) * hexSize, hexSize);
}

/** Largest hex-size multiple that is at most `maxRadius`. */
export function snappedRadiusMax(hexSize: number, maxRadius: number): number {
  if (!Number.isFinite(hexSize) || hexSize <= 0 || !Number.isFinite(maxRadius)) {
    return maxRadius;
  }
  const snapped = snapRadiusToHexSize(Math.floor(maxRadius / hexSize) * hexSize, hexSize);
  if (snapped > maxRadius) {
    return snapRadiusToHexSize(snapped - hexSize, hexSize);
  }
  return snapped > 0 ? snapped : snapRadiusToHexSize(hexSize, hexSize);
}

export function matchPlanetPresetId(
  equatorialRadiusKm: number,
  polarRadiusKm: number,
  hexSizeKm: number,
): PlanetPresetId | "custom" {
  const equatorial = snapRadiusToHexSize(equatorialRadiusKm, hexSizeKm);
  const polar = snapRadiusToHexSize(polarRadiusKm, hexSizeKm);
  const found = PLANET_PRESETS.find(
    (preset) =>
      snapRadiusToHexSize(preset.equatorialRadiusKm, hexSizeKm) === equatorial &&
      snapRadiusToHexSize(preset.polarRadiusKm, hexSizeKm) === polar,
  );
  return found?.id ?? "custom";
}
