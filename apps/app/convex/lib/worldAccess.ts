import type { Id } from "../_generated/dataModel.js";
import type { MutationCtx, QueryCtx } from "../_generated/server.js";
import { authz } from "../authz.js";
import {
  PARTY_DERIVED_PLAYER_PERMISSIONS,
  type WorldPermission,
  worldScope,
} from "./authzModel.js";

/**
 * True when the user is a member of a party granted access to this world.
 */
export async function hasPartyDerivedWorldAccess(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  worldId: Id<"worlds">,
): Promise<boolean> {
  // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per world are bounded
  const grants = await ctx.db
    .query("worldPartyGrants")
    .withIndex("by_world", (q) => q.eq("worldId", worldId))
    .collect();

  for (const grant of grants) {
    const membership = await ctx.db
      .query("partyMemberships")
      .withIndex("by_party_and_user", (q) => q.eq("partyId", grant.partyId).eq("userId", userId))
      .unique();
    if (membership) {
      return true;
    }
  }
  return false;
}

export async function canOnWorld(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  worldId: Id<"worlds">,
  permission: WorldPermission,
): Promise<boolean> {
  const scope = worldScope(worldId);
  const direct = await authz.can(ctx, userId, permission, scope);
  if (direct) {
    return true;
  }
  if (PARTY_DERIVED_PLAYER_PERMISSIONS.includes(permission)) {
    return await hasPartyDerivedWorldAccess(ctx, userId, worldId);
  }
  return false;
}

export async function requireOnWorld(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  worldId: Id<"worlds">,
  permission: WorldPermission,
): Promise<void> {
  const allowed = await canOnWorld(ctx, userId, worldId, permission);
  if (!allowed) {
    throw new Error("World not found or access denied");
  }
}

export async function listWorldIdsForPartyMember(
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
): Promise<Array<Id<"worlds">>> {
  // eslint-disable-next-line @convex-dev/no-collect-in-query -- memberships per user bounded
  const memberships = await ctx.db
    .query("partyMemberships")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect();

  const worldIds = new Set<Id<"worlds">>();
  for (const membership of memberships) {
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per party bounded
    const grants = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_party", (q) => q.eq("partyId", membership.partyId))
      .collect();
    for (const grant of grants) {
      worldIds.add(grant.worldId);
    }
  }
  return [...worldIds];
}
