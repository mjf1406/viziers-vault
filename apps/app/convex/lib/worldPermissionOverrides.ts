import { APP_CONFIG } from "../appConfig.js";
import { authz } from "../authz.js";
import { components } from "../_generated/api.js";
import type { Id } from "../_generated/dataModel.js";
import type { MutationCtx, QueryCtx } from "../_generated/server.js";
import {
  WORLD_ROLES,
  isWorldRole,
  pickHighestWorldRole,
  worldScope,
  type WorldPermission,
  type WorldRole,
} from "./authzModel.js";
import { listWorldIdsForPartyMember } from "./worldAccess.js";

export async function listWorldPermissionOverrides(
  ctx: QueryCtx | MutationCtx,
  worldId: Id<"worlds">,
  userId: string,
): Promise<Array<{ permission: string; effect: "allow" | "deny" }>> {
  const scope = worldScope(worldId);
  const rows = (await ctx.runQuery(components.authz.queries.getPermissionOverrides, {
    tenantId: APP_CONFIG.authzTenantId,
    userId,
  })) as Array<{
    permission: string;
    effect: "allow" | "deny";
    scope?: { type: string; id: string };
  }>;

  return rows
    .filter(
      (row) =>
        row.scope?.type === scope.type &&
        row.scope.id === scope.id &&
        (row.effect === "allow" || row.effect === "deny"),
    )
    .map((row) => ({
      permission: row.permission,
      effect: row.effect,
    }));
}

export async function clearWorldPermissionOverrides(
  ctx: MutationCtx,
  worldId: Id<"worlds">,
  userId: string,
): Promise<number> {
  const scope = worldScope(worldId);
  const overrides = await listWorldPermissionOverrides(ctx, worldId, userId);
  let removed = 0;
  for (const row of overrides) {
    const ok = await authz.removeOverride(ctx, userId, row.permission as WorldPermission, scope);
    if (ok) removed += 1;
  }
  return removed;
}

export async function hasFineGrainedWorldPermissionOverrides(
  ctx: QueryCtx | MutationCtx,
  worldId: Id<"worlds">,
  userId: string,
): Promise<boolean> {
  const overrides = await listWorldPermissionOverrides(ctx, worldId, userId);
  return overrides.some((row) => row.permission !== "*");
}

export async function revokeAllWorldMembership(
  ctx: MutationCtx,
  worldId: Id<"worlds">,
): Promise<void> {
  const scope = worldScope(worldId);
  const userIds = new Set<string>();
  for (const role of WORLD_ROLES) {
    const users = await ctx.runQuery(components.authz.queries.getUsersWithRole, {
      tenantId: APP_CONFIG.authzTenantId,
      role,
      scope,
    });
    for (const user of users) {
      userIds.add(user.userId);
    }
  }
  for (const userId of userIds) {
    await authz.offboardUser(ctx, userId, {
      scope,
      removeOverrides: true,
      removeRelationships: true,
      removeAttributes: false,
    });
  }
}

export async function resolveWorldRoleForUser(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  worldId: Id<"worlds">,
): Promise<WorldRole | "party_player" | null> {
  const scope = worldScope(worldId);
  const roleEntries = await authz.getUserRoles(ctx, userId, scope);
  const role = pickHighestWorldRole(
    roleEntries.map((entry: { role: string }) => entry.role).filter(isWorldRole),
  );
  if (role) {
    return role;
  }
  const partyWorldIds = await listWorldIdsForPartyMember(ctx, userId);
  if (partyWorldIds.includes(worldId)) {
    return "party_player";
  }
  return null;
}
