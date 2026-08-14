import { z } from "zod";

import {
  MAX_ENTITY_DESCRIPTION_LENGTH,
  MAX_ENTITY_ICON_LENGTH,
  MAX_ENTITY_NAME_LENGTH,
} from "../entityVisual.js";

const fontAwesomeIconIdSchema = z
  .string()
  .regex(/^(fas|far):[a-z0-9-]+$/i, "Invalid Font Awesome icon id");

const emojiIconSchema = z
  .string()
  .min(1)
  .max(MAX_ENTITY_ICON_LENGTH)
  .refine((value) => !value.includes(":") && /\p{Extended_Pictographic}/u.test(value), {
    message: "Icon must be a Font Awesome id or emoji",
  });

export const entityIconSchema = z.union([fontAwesomeIconIdSchema, emojiIconSchema]);

export function isFontAwesomeIconId(value: string): boolean {
  return /^(fas|far):[a-z0-9-]+$/i.test(value.trim());
}

export function isEmojiIcon(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && !trimmed.includes(":") && /\p{Extended_Pictographic}/u.test(trimmed);
}

export const worldFormSchemaEn = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "World name is required")
      .max(
        MAX_ENTITY_NAME_LENGTH,
        `World name must be at most ${MAX_ENTITY_NAME_LENGTH} characters`,
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

export type WorldFormValues = z.infer<typeof worldFormSchemaEn>;

export function deleteConfirmationPhrase(name: string): string {
  return `delete ${name}`;
}
