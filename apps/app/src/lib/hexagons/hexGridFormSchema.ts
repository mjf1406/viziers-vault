import { z } from "zod";

import {
  DEFAULT_EQUATORIAL_RADIUS_KM,
  DEFAULT_HEX_SIZE_KM,
  DEFAULT_POLAR_RADIUS_KM,
  snapRadiusToHexSize,
} from "./planetPresets";

export const HEX_ORIENTATIONS = ["pointy", "flat"] as const;
export type HexOrientation = (typeof HEX_ORIENTATIONS)[number];

export const HEX_OFFSET_PARITIES = ["even", "odd"] as const;
export type HexOffsetParity = (typeof HEX_OFFSET_PARITIES)[number];

export const HEX_UNITS = ["kilometers", "miles"] as const;
export type HexUnit = (typeof HEX_UNITS)[number];

export const MIN_PLANET_RADIUS = 1;
export const MAX_PLANET_RADIUS = 100_000;
export const MIN_HEX_SIZE = 1;
export const MAX_HEX_SIZE = 1_000_000;
export const MIN_HEX_GRID_SIZE_PX = 20;
export const MAX_HEX_GRID_SIZE_PX = 256;
export const DEFAULT_HEX_GRID_SIZE_PX = 50;

export type HexGridFormMessages = {
  planetRadiusNumber: string;
  planetRadiusInteger: string;
  planetRadiusMin: string;
  planetRadiusMax: string;
  hexSizeNumber: string;
  hexSizeInteger: string;
  hexSizeMin: string;
  hexSizeMax: string;
  gridSizeNumber: string;
  gridSizeInteger: string;
  gridSizeMin: string;
  gridSizeMax: string;
  unitRequired: string;
  typeRequired: string;
  offsetRequired: string;
};

function planetRadiusSchema(messages: HexGridFormMessages) {
  return z
    .number({ error: messages.planetRadiusNumber })
    .int({ error: messages.planetRadiusInteger })
    .min(MIN_PLANET_RADIUS, { error: messages.planetRadiusMin })
    .max(MAX_PLANET_RADIUS, { error: messages.planetRadiusMax });
}

export function createHexGridFormSchema(messages: HexGridFormMessages) {
  return z.object({
    unit: z.enum(HEX_UNITS, { error: messages.unitRequired }),
    equatorialRadius: planetRadiusSchema(messages),
    polarRadius: planetRadiusSchema(messages),
    hexSize: z
      .number({ error: messages.hexSizeNumber })
      .int({ error: messages.hexSizeInteger })
      .min(MIN_HEX_SIZE, { error: messages.hexSizeMin })
      .max(MAX_HEX_SIZE, { error: messages.hexSizeMax }),
    gridSize: z
      .number({ error: messages.gridSizeNumber })
      .int({ error: messages.gridSizeInteger })
      .min(MIN_HEX_GRID_SIZE_PX, { error: messages.gridSizeMin })
      .max(MAX_HEX_GRID_SIZE_PX, { error: messages.gridSizeMax }),
    orientation: z.enum(HEX_ORIENTATIONS, { error: messages.typeRequired }),
    offsetParity: z.enum(HEX_OFFSET_PARITIES, { error: messages.offsetRequired }),
  });
}

export type HexGridFormValues = z.infer<ReturnType<typeof createHexGridFormSchema>>;

export function emptyHexGridFormValues(): HexGridFormValues {
  return {
    unit: "kilometers",
    equatorialRadius: snapRadiusToHexSize(DEFAULT_EQUATORIAL_RADIUS_KM, DEFAULT_HEX_SIZE_KM),
    polarRadius: snapRadiusToHexSize(DEFAULT_POLAR_RADIUS_KM, DEFAULT_HEX_SIZE_KM),
    hexSize: DEFAULT_HEX_SIZE_KM,
    gridSize: DEFAULT_HEX_GRID_SIZE_PX,
    orientation: "flat",
    offsetParity: "even",
  };
}
