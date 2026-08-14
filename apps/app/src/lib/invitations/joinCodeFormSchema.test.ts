import { describe, expect, test } from "vite-plus/test";

import {
  assignablePartyJoinCodeRoles,
  assignableWorldJoinCodeRoles,
  createPartyJoinCodeFormSchema,
  createWorldJoinCodeFormSchema,
  isCompleteJoinCode,
  JOIN_CODE_LENGTH,
  MAX_JOIN_CODE_USES,
  MIN_JOIN_CODE_USES,
  normalizeJoinCodeInput,
  redeemJoinCodeSchema,
  ttlMsForOption,
} from "./joinCodeFormSchema";

describe("joinCodeFormSchema", () => {
  test("normalizes and validates redeem codes", () => {
    expect(normalizeJoinCodeInput(" ab-12c ")).toBe("AB12C");
    expect(isCompleteJoinCode("ABCDEF")).toBe(true);
    expect(isCompleteJoinCode("ABCDE")).toBe(false);
    expect(redeemJoinCodeSchema.parse("ab12cd")).toBe("AB12CD");
    expect(() => redeemJoinCodeSchema.parse("short")).toThrow();
  });

  test("maps TTL options and rejects out-of-range uses", () => {
    expect(ttlMsForOption("15m")).toBe(15 * 60 * 1000);
    expect(ttlMsForOption("1d")).toBe(24 * 60 * 60 * 1000);

    const valid = createWorldJoinCodeFormSchema.parse({
      role: "game_master",
      ttlOption: "1h",
      usesMode: "preset",
      usesPreset: "5",
      usesCustom: "",
    });
    expect(valid).toEqual({ role: "game_master", ttlMs: 60 * 60 * 1000, maxUses: 5 });

    const custom = createPartyJoinCodeFormSchema.parse({
      role: "member",
      ttlOption: "6h",
      usesMode: "custom",
      usesPreset: "1",
      usesCustom: "42",
    });
    expect(custom.maxUses).toBe(42);

    expect(() =>
      createWorldJoinCodeFormSchema.parse({
        role: "game_master",
        ttlOption: "1h",
        usesMode: "custom",
        usesPreset: "1",
        usesCustom: String(MAX_JOIN_CODE_USES + 1),
      }),
    ).toThrow();
    expect(() =>
      createPartyJoinCodeFormSchema.parse({
        role: "member",
        ttlOption: "1h",
        usesMode: "custom",
        usesPreset: "1",
        usesCustom: String(MIN_JOIN_CODE_USES - 1),
      }),
    ).toThrow();
  });

  test("filters assignable roles by invite permissions", () => {
    const canWorld = (permission: string) =>
      permission === "game_masters:invite" || permission === "assistant_game_masters:invite";
    expect(assignableWorldJoinCodeRoles(canWorld)).toEqual([
      "game_master",
      "assistant_game_master",
    ]);
    expect(assignablePartyJoinCodeRoles()).toEqual(["leader", "member"]);
    expect(JOIN_CODE_LENGTH).toBe(6);
  });
});
