import { z } from "zod";

import type { JoinCodeRole } from "@/lib/permissions/classPermissions";
import {
  isJoinCodeRole,
  JOIN_CODE_INVITE_PERMISSION_BY_ROLE,
} from "@/lib/permissions/classPermissions";
import type { ClassPermission } from "@/lib/permissions/classPermissions";
import {
  isPartyJoinCodeRole,
  isWorldJoinCodeRole,
  JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE,
  type PartyJoinCodeRole,
  type WorldJoinCodeRole,
  type WorldPermission,
} from "@/lib/permissions/worldPermissions";

export const JOIN_CODE_LENGTH = 6;
export const MIN_JOIN_CODE_USES = 1;
export const MAX_JOIN_CODE_USES = 100;
export const MAX_JOIN_CODE_TTL_MS = 24 * 60 * 60 * 1000;

export const JOIN_CODE_TTL_OPTIONS = [
  { value: "15m", ttlMs: 15 * 60 * 1000 },
  { value: "1h", ttlMs: 60 * 60 * 1000 },
  { value: "6h", ttlMs: 6 * 60 * 60 * 1000 },
  { value: "12h", ttlMs: 12 * 60 * 60 * 1000 },
  { value: "1d", ttlMs: 24 * 60 * 60 * 1000 },
] as const;

export type JoinCodeTtlOption = (typeof JOIN_CODE_TTL_OPTIONS)[number]["value"];

export const JOIN_CODE_USE_PRESETS = [1, 5, 10, 25] as const;

export function normalizeJoinCodeInput(code: string): string {
  return code
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function isCompleteJoinCode(code: string): boolean {
  return normalizeJoinCodeInput(code).length === JOIN_CODE_LENGTH;
}

export function ttlMsForOption(option: JoinCodeTtlOption): number {
  const match = JOIN_CODE_TTL_OPTIONS.find((entry) => entry.value === option);
  if (!match) {
    throw new Error("Invalid TTL option");
  }
  return match.ttlMs;
}

export function assignableJoinCodeRoles(
  can: (permission: ClassPermission) => boolean,
): Array<JoinCodeRole> {
  return (Object.keys(JOIN_CODE_INVITE_PERMISSION_BY_ROLE) as Array<JoinCodeRole>).filter((role) =>
    can(JOIN_CODE_INVITE_PERMISSION_BY_ROLE[role]),
  );
}

export function assignableWorldJoinCodeRoles(
  can: (permission: WorldPermission) => boolean,
): Array<WorldJoinCodeRole> {
  return (
    Object.keys(JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE) as Array<WorldJoinCodeRole>
  ).filter((role) => can(JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE[role]));
}

export function assignablePartyJoinCodeRoles(): Array<PartyJoinCodeRole> {
  return ["leader", "member"];
}

function createJoinCodeRoleSchema<T extends string>(
  refine: (value: string) => value is T,
  message: string,
) {
  return z.string().refine((value): value is T => refine(value), { message });
}

const joinCodeFormFields = {
  ttlOption: z.enum([
    "15m",
    "1h",
    "6h",
    "12h",
    "1d",
  ] as const satisfies ReadonlyArray<JoinCodeTtlOption>),
  usesMode: z.enum(["preset", "custom"]),
  usesPreset: z.string(),
  usesCustom: z.string(),
} as const;

function joinCodeUsesRefine(
  value: { usesMode: "preset" | "custom"; usesPreset: string; usesCustom: string },
  ctx: z.RefinementCtx,
) {
  if (value.usesMode === "preset") {
    const parsed = Number(value.usesPreset);
    if (!JOIN_CODE_USE_PRESETS.includes(parsed as (typeof JOIN_CODE_USE_PRESETS)[number])) {
      ctx.addIssue({
        code: "custom",
        path: ["usesPreset"],
        message: "Select a uses option",
      });
    }
    return;
  }

  const trimmed = value.usesCustom.trim();
  if (!/^\d+$/.test(trimmed)) {
    ctx.addIssue({
      code: "custom",
      path: ["usesCustom"],
      message: "Enter a whole number",
    });
    return;
  }
  const parsed = Number(trimmed);
  if (parsed < MIN_JOIN_CODE_USES || parsed > MAX_JOIN_CODE_USES) {
    ctx.addIssue({
      code: "custom",
      path: ["usesCustom"],
      message: `Uses must be between ${MIN_JOIN_CODE_USES} and ${MAX_JOIN_CODE_USES}`,
    });
  }
}

function joinCodeUsesTransform(value: {
  role: string;
  ttlOption: JoinCodeTtlOption;
  usesMode: "preset" | "custom";
  usesPreset: string;
  usesCustom: string;
}) {
  const maxUses =
    value.usesMode === "preset" ? Number(value.usesPreset) : Number(value.usesCustom.trim());
  return {
    role: value.role,
    ttlMs: ttlMsForOption(value.ttlOption),
    maxUses,
  };
}

export const createJoinCodeFormSchema = z
  .object({
    role: createJoinCodeRoleSchema(isJoinCodeRole, "Select a role"),
    ...joinCodeFormFields,
  })
  .superRefine(joinCodeUsesRefine)
  .transform(joinCodeUsesTransform);

export const createWorldJoinCodeFormSchema = z
  .object({
    role: createJoinCodeRoleSchema(isWorldJoinCodeRole, "Select a role"),
    ...joinCodeFormFields,
  })
  .superRefine(joinCodeUsesRefine)
  .transform(joinCodeUsesTransform);

export const createPartyJoinCodeFormSchema = z
  .object({
    role: createJoinCodeRoleSchema(isPartyJoinCodeRole, "Select a role"),
    ...joinCodeFormFields,
  })
  .superRefine(joinCodeUsesRefine)
  .transform(joinCodeUsesTransform);

export type CreateJoinCodeFormInput = z.input<typeof createJoinCodeFormSchema>;
export type CreateJoinCodeFormValues = z.output<typeof createJoinCodeFormSchema>;
export type CreateWorldJoinCodeFormValues = z.output<typeof createWorldJoinCodeFormSchema>;
export type CreatePartyJoinCodeFormValues = z.output<typeof createPartyJoinCodeFormSchema>;

export const redeemJoinCodeSchema = z
  .string()
  .transform(normalizeJoinCodeInput)
  .refine((value) => value.length === JOIN_CODE_LENGTH, {
    message: "Invite code must be 6 characters",
  });
