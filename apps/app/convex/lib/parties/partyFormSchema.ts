import { z } from "zod";

import { MAX_ENTITY_DESCRIPTION_LENGTH, MAX_ENTITY_NAME_LENGTH } from "../entityVisual.js";
import { entityIconSchema } from "../worlds/worldFormSchema.js";

export const partyFormSchemaEn = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Party name is required")
      .max(
        MAX_ENTITY_NAME_LENGTH,
        `Party name must be at most ${MAX_ENTITY_NAME_LENGTH} characters`,
      ),
    description: z
      .string()
      .trim()
      .max(
        MAX_ENTITY_DESCRIPTION_LENGTH,
        `Description must be at most ${MAX_ENTITY_DESCRIPTION_LENGTH} characters`,
      )
      .optional(),
    icon: z.string().trim().optional(),
    imageFileId: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    const icon = value.icon?.trim();
    const hasIcon = icon && icon.length > 0;
    const hasImage = value.imageFileId !== undefined && value.imageFileId.length > 0;
    if (hasIcon && hasImage) {
      ctx.addIssue({
        code: "custom",
        message: "Choose either an icon or an image, not both",
        path: ["icon"],
      });
    }
    if (hasIcon) {
      const parsed = entityIconSchema.safeParse(icon);
      if (!parsed.success) {
        ctx.addIssue({
          code: "custom",
          message: parsed.error.issues[0]?.message ?? "Invalid icon",
          path: ["icon"],
        });
      }
    }
  });

export type PartyFormValues = z.infer<typeof partyFormSchemaEn>;
