import {
  definePermissions,
  defineRoles,
  flattenRolePermissions,
  type PermissionString,
} from "@djpanda/convex-authz";

/**
 * Single source of truth for world permissions and roles.
 * No Convex imports — safe to import from `src/` at runtime.
 */

export const permissions = definePermissions({
  world: { read: true, update: true, archive: true, delete: true },
  game_masters: { read: true, invite: true, remove: true, suspend: true },
  assistant_game_masters: { read: true, invite: true, remove: true, suspend: true },
  players: { read: true },
  parties: { read: true, grant: true, revoke: true },
  invitations: { read: true, create: true, revoke: true },
  files: { read: true, create: true },
  permissions: { manage: true },
  admin: { syncProducts: true, viewHealth: true, manageUsers: true, viewFeedback: true },
});

export const roles = defineRoles(permissions, {
  world_member: { world: ["read"], files: ["read"] },
  player: { inherits: "world_member" },
  assistant_game_master: {
    inherits: "world_member",
    game_masters: ["read"],
    assistant_game_masters: ["read"],
    players: ["read"],
    parties: ["read"],
  },
  game_master: {
    inherits: "assistant_game_master",
    world: ["update", "archive"],
    assistant_game_masters: ["invite", "remove", "suspend"],
    invitations: ["read", "create", "revoke"],
    files: ["create"],
    parties: ["grant", "revoke"],
  },
  owner: {
    inherits: "game_master",
    world: ["delete"],
    game_masters: ["invite", "remove", "suspend"],
    permissions: ["manage"],
  },
  app_admin: {
    admin: ["syncProducts", "viewHealth", "manageUsers", "viewFeedback"],
  },
});

export type AppPermission = PermissionString<typeof permissions>;
export type WorldPermission = Exclude<AppPermission, `admin:${string}`>;

export const WORLD_ROLE_NAMES = [
  "owner",
  "game_master",
  "assistant_game_master",
  "player",
  "world_member",
] as const;

export type WorldRole = (typeof WORLD_ROLE_NAMES)[number];

export const WORLD_ROLES: Array<WorldRole> = [...WORLD_ROLE_NAMES];

export const WORLD_ROLE_RANK: Record<WorldRole, number> = {
  owner: 60,
  game_master: 50,
  assistant_game_master: 40,
  player: 30,
  world_member: 10,
};

export function worldScope(worldId: string) {
  return { type: "world", id: worldId } as const;
}

export function permissionsForRole(role: WorldRole): Array<string> {
  return flattenRolePermissions(roles, role);
}

const NON_GRANTABLE_WORLD_PERMISSIONS = new Set<string>(["permissions:manage", "world:delete"]);

export const PERMISSION_OVERRIDE_TARGET_ROLES = [
  "game_master",
  "assistant_game_master",
] as const satisfies ReadonlyArray<WorldRole>;

export type PermissionOverrideTargetRole = (typeof PERMISSION_OVERRIDE_TARGET_ROLES)[number];

export function isPermissionOverrideTargetRole(
  value: string,
): value is PermissionOverrideTargetRole {
  return (PERMISSION_OVERRIDE_TARGET_ROLES as ReadonlyArray<string>).includes(value);
}

export function isGrantableWorldPermission(value: string): value is WorldPermission {
  if (value.startsWith("admin:")) return false;
  if (NON_GRANTABLE_WORLD_PERMISSIONS.has(value)) return false;
  return permissionsForRole("owner").includes(value);
}

export const GRANTABLE_WORLD_PERMISSIONS: Array<WorldPermission> = permissionsForRole("owner")
  .filter(isGrantableWorldPermission)
  .sort((a, b) => a.localeCompare(b));

export function grantablePermissionGroups(): Array<{
  resource: string;
  permissions: Array<WorldPermission>;
}> {
  const byResource = new Map<string, Array<WorldPermission>>();
  for (const permission of GRANTABLE_WORLD_PERMISSIONS) {
    const resource = permission.split(":")[0] ?? permission;
    const list = byResource.get(resource) ?? [];
    list.push(permission);
    byResource.set(resource, list);
  }
  return [...byResource.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([resource, perms]) => ({ resource, permissions: perms }));
}

export type PermissionOverrideEffect = "allow" | "deny";

export function effectivePermissionEnabled(
  roleDefault: boolean,
  override: PermissionOverrideEffect | null,
): boolean {
  if (override === "deny") return false;
  if (override === "allow") return true;
  return roleDefault;
}

export function isWorldRole(value: string): value is WorldRole {
  return (WORLD_ROLE_NAMES as ReadonlyArray<string>).includes(value);
}

export function pickHighestWorldRole(roleNames: Array<string>): WorldRole | null {
  let best: WorldRole | null = null;
  let bestRank = -1;
  for (const name of roleNames) {
    if (!isWorldRole(name)) continue;
    const rank = WORLD_ROLE_RANK[name];
    if (rank > bestRank) {
      best = name;
      bestRank = rank;
    }
  }
  return best;
}

export const SUSPEND_PERMISSION_BY_ROLE = {
  owner: null,
  game_master: "game_masters:suspend",
  assistant_game_master: "assistant_game_masters:suspend",
  player: null,
  world_member: null,
} as const satisfies Record<WorldRole, WorldPermission | null>;

export const REMOVE_PERMISSION_BY_ROLE = {
  owner: null,
  game_master: "game_masters:remove",
  assistant_game_master: "assistant_game_masters:remove",
  player: null,
  world_member: null,
} as const satisfies Record<WorldRole, WorldPermission | null>;

export type WorldJoinCodeRole = "game_master" | "assistant_game_master";

export type PartyJoinCodeRole = "leader" | "member";

export type MemberListRole = WorldJoinCodeRole;

export const MEMBER_LIST_AUTHZ_ROLES = {
  game_master: ["owner", "game_master"],
  assistant_game_master: ["assistant_game_master"],
} as const satisfies Record<MemberListRole, ReadonlyArray<WorldRole>>;

export const MEMBER_LIST_READ_PERMISSION_BY_ROLE = {
  game_master: "game_masters:read",
  assistant_game_master: "assistant_game_masters:read",
} as const satisfies Record<MemberListRole, WorldPermission>;

export const WORLD_JOIN_CODE_ROLES = [
  "game_master",
  "assistant_game_master",
] as const satisfies ReadonlyArray<WorldJoinCodeRole>;

export const PARTY_JOIN_CODE_ROLES = [
  "leader",
  "member",
] as const satisfies ReadonlyArray<PartyJoinCodeRole>;

export const JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE = {
  game_master: "game_masters:invite",
  assistant_game_master: "assistant_game_masters:invite",
} as const satisfies Record<WorldJoinCodeRole, WorldPermission>;

export function isWorldJoinCodeRole(value: string): value is WorldJoinCodeRole {
  return (WORLD_JOIN_CODE_ROLES as ReadonlyArray<string>).includes(value);
}

export function isPartyJoinCodeRole(value: string): value is PartyJoinCodeRole {
  return (PARTY_JOIN_CODE_ROLES as ReadonlyArray<string>).includes(value);
}

export function canManageWorldRoles(actorRole: WorldRole | null | undefined): boolean {
  return actorRole === "owner" || actorRole === "game_master";
}

export function isStrictlyBelow(actorRole: WorldRole, otherRole: WorldRole): boolean {
  return WORLD_ROLE_RANK[otherRole] < WORLD_ROLE_RANK[actorRole];
}

export function assignableWorldRolesFor(actorRole: WorldRole): Array<WorldJoinCodeRole> {
  if (!canManageWorldRoles(actorRole)) return [];
  return WORLD_JOIN_CODE_ROLES.filter((role) => isStrictlyBelow(actorRole, role));
}

export function canChangeMemberRole(
  actorRole: WorldRole | null | undefined,
  memberRole: WorldRole,
): boolean {
  if (!actorRole || !canManageWorldRoles(actorRole)) return false;
  return isStrictlyBelow(actorRole, memberRole);
}

/** Permissions party-derived players receive on granted worlds. */
export const PARTY_DERIVED_PLAYER_PERMISSIONS: ReadonlyArray<WorldPermission> = [
  "world:read",
  "files:read",
];
