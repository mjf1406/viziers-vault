import { v } from "convex/values";

export const MAX_ENTITY_NAME_LENGTH = 100;
export const MAX_ENTITY_DESCRIPTION_LENGTH = 500;
export const MAX_ENTITY_ICON_LENGTH = 32;

export function normalizeEntityName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Name is required");
  }
  if (trimmed.length > MAX_ENTITY_NAME_LENGTH) {
    throw new Error(`Name must be at most ${MAX_ENTITY_NAME_LENGTH} characters`);
  }
  return trimmed;
}

export function normalizeEntityDescription(description: string | undefined): string | undefined {
  if (description === undefined) {
    return undefined;
  }
  const trimmed = description.trim();
  if (!trimmed) {
    return undefined;
  }
  if (trimmed.length > MAX_ENTITY_DESCRIPTION_LENGTH) {
    throw new Error(`Description must be at most ${MAX_ENTITY_DESCRIPTION_LENGTH} characters`);
  }
  return trimmed;
}

export function normalizeEntityIcon(icon: string | undefined): string | undefined {
  if (icon === undefined) {
    return undefined;
  }
  const trimmed = icon.trim();
  if (!trimmed) {
    return undefined;
  }
  if (trimmed.length > MAX_ENTITY_ICON_LENGTH) {
    throw new Error(`Icon must be at most ${MAX_ENTITY_ICON_LENGTH} characters`);
  }
  const isFontAwesome = /^(fas|far):[a-z0-9-]+$/i.test(trimmed);
  const isEmoji = !trimmed.includes(":") && /\p{Extended_Pictographic}/u.test(trimmed);
  if (!isFontAwesome && !isEmoji) {
    throw new Error("Icon must be a Font Awesome id or emoji");
  }
  return trimmed;
}

/** Exactly one visual: icon string, image file id, or neither — never both. */
export function normalizeVisualFields(args: { icon?: string; imageFileId?: string }): {
  icon?: string;
  imageFileId?: string;
} {
  const icon = normalizeEntityIcon(args.icon);
  const imageFileId = args.imageFileId;
  if (icon && imageFileId) {
    throw new Error("Choose either an icon or an image, not both");
  }
  return { icon, imageFileId };
}

export const entityVisualValidator = v.object({
  icon: v.optional(v.string()),
  imageFileId: v.optional(v.id("files")),
});
