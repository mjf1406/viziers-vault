import { describe, expect, test } from "vite-plus/test";

import {
  GRANTABLE_WORLD_PERMISSIONS,
  JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE,
  effectivePermissionEnabled,
  grantablePermissionGroups,
  isGrantableWorldPermission,
  isPermissionOverrideTargetRole,
  permissionsForRole,
} from "./authzModel";

describe("grantable world permissions", () => {
  test("excludes owner-only and admin permissions", () => {
    expect(isGrantableWorldPermission("permissions:manage")).toBe(false);
    expect(isGrantableWorldPermission("world:delete")).toBe(false);
    expect(isGrantableWorldPermission("admin:manageUsers")).toBe(false);
    expect(GRANTABLE_WORLD_PERMISSIONS).not.toContain("permissions:manage");
    expect(GRANTABLE_WORLD_PERMISSIONS).not.toContain("world:delete");
  });

  test("includes common staff permissions from the owner catalog", () => {
    expect(isGrantableWorldPermission("files:create")).toBe(true);
    expect(isGrantableWorldPermission("players:read")).toBe(true);
    expect(GRANTABLE_WORLD_PERMISSIONS).toContain("files:create");
    expect(GRANTABLE_WORLD_PERMISSIONS.every((permission) => permission.includes(":"))).toBe(true);
  });

  test("groups permissions by resource", () => {
    const groups = grantablePermissionGroups();
    const worldGroup = groups.find((group) => group.resource === "world");
    expect(worldGroup?.permissions).toEqual(
      expect.arrayContaining(["world:read", "world:update", "world:archive"]),
    );
    expect(worldGroup?.permissions).not.toContain("world:delete");
  });

  test("owner role includes permissions:manage", () => {
    expect(permissionsForRole("owner")).toContain("permissions:manage");
    expect(permissionsForRole("game_master")).not.toContain("permissions:manage");
  });

  test("VCTR catalog has no product permissions", () => {
    expect(
      GRANTABLE_WORLD_PERMISSIONS.every((permission) => !permission.startsWith("product:")),
    ).toBe(true);
    expect(
      permissionsForRole("owner").every((permission) => !permission.startsWith("product:")),
    ).toBe(true);
  });
});

describe("permission override helpers", () => {
  test("only game_master and assistant_game_master are override targets", () => {
    expect(isPermissionOverrideTargetRole("game_master")).toBe(true);
    expect(isPermissionOverrideTargetRole("assistant_game_master")).toBe(true);
    expect(isPermissionOverrideTargetRole("owner")).toBe(false);
    expect(isPermissionOverrideTargetRole("player")).toBe(false);
    expect(isPermissionOverrideTargetRole("world_member")).toBe(false);
  });

  test("effectivePermissionEnabled applies deny-wins then grant then role default", () => {
    expect(effectivePermissionEnabled(true, "deny")).toBe(false);
    expect(effectivePermissionEnabled(false, "allow")).toBe(true);
    expect(effectivePermissionEnabled(true, null)).toBe(true);
    expect(effectivePermissionEnabled(false, null)).toBe(false);
  });
});

describe("world join code invite permissions", () => {
  test("maps staff invite roles to invitation permissions", () => {
    expect(JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE.game_master).toBe("game_masters:invite");
    expect(JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE.assistant_game_master).toBe(
      "assistant_game_masters:invite",
    );
  });
});
