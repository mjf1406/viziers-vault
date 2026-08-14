import { v } from "convex/values";

import { authz } from "./authz.js";
import { internalAction, internalMutation } from "./_generated/server.js";
import { worldScope, permissionsForRole } from "./lib/authzModel.js";
import { permissionSnapshotForScope } from "./lib/permissionSnapshot.js";

/**
 * Re-materialize effective permissions after `defineRoles` / `definePermissions` changes.
 * Run once after deploying role-catalog updates (e.g. moving `files:create` to teacher):
 * - Dev: `vp run perms` (or `bunx convex run internal.authzBackfill.syncCatalogRoles`)
 * - Prod: `vp run perms-prod` (or `bunx convex run --prod internal.authzBackfill.syncCatalogRoles`)
 * - Self-host (Electron / Docker): `scripts/self-host-bootstrap.mjs` runs this after deploy
 */
export const syncCatalogRoles = internalAction({
  args: {},
  returns: v.object({
    rolesProcessed: v.number(),
    usersProcessed: v.number(),
  }),
  handler: async (ctx) => {
    return await authz.syncRoles(ctx);
  },
});

/**
 * One-time backfill: assign the owner role for every existing class.
 * Safe to re-run — assignRole upserts / extends existing assignments.
 */
export const assignOwnerRoles = internalMutation({
  args: {},
  returns: v.object({
    assigned: v.number(),
    skipped: v.number(),
  }),
  handler: async (ctx) => {
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- bounded worlds table
    const worlds = await ctx.db.query("worlds").collect();
    let assigned = 0;
    let skipped = 0;

    for (const world of worlds) {
      const scope = worldScope(world._id);
      const alreadyOwner = await authz.hasRole(ctx, world.ownerId, "owner", scope);
      if (alreadyOwner) {
        skipped += 1;
        continue;
      }
      await authz.assignRole(ctx, world.ownerId, "owner", scope);
      assigned += 1;
    }

    return { assigned, skipped };
  },
});

/**
 * Smoke-test role inheritance + suspend deny override without touching real users.
 */
export const smokeVerify = internalMutation({
  args: { worldId: v.id("worlds") },
  returns: v.object({
    ownerCanDelete: v.boolean(),
    ownerPermissionCount: v.number(),
    playerCanRead: v.boolean(),
    playerCanUpdate: v.boolean(),
    playerPermissionCount: v.number(),
    suspendedCanRead: v.boolean(),
    playerPermsMatchModel: v.boolean(),
  }),
  handler: async (ctx, args) => {
    if (process.env.ALLOW_SMOKE_TESTS !== "true") {
      throw new Error(
        "smokeVerify is disabled. Set ALLOW_SMOKE_TESTS=true on the deployment to run.",
      );
    }
    const worldDoc = await ctx.db.get("worlds", args.worldId);
    if (!worldDoc) {
      throw new Error("World not found");
    }
    const scope = worldScope(args.worldId);
    const ownerSnapshot = await permissionSnapshotForScope(ctx, worldDoc.ownerId, scope);
    const ownerCanDelete = await authz.can(ctx, worldDoc.ownerId, "world:delete", scope);

    const testUser = `smoke:player:${args.worldId}`;
    await authz.assignRole(ctx, testUser, "player", scope);
    const playerCanRead = await authz.can(ctx, testUser, "world:read", scope);
    const playerCanUpdate = await authz.can(ctx, testUser, "world:update", scope);
    const playerSnapshot = await permissionSnapshotForScope(ctx, testUser, scope);
    const modelPerms = new Set(permissionsForRole("player"));
    const playerPermsMatchModel =
      playerSnapshot.permissions.length === modelPerms.size &&
      playerSnapshot.permissions.every((p) => modelPerms.has(p));

    await authz.denyPermission(ctx, testUser, "*", scope, "smoke suspend");
    const suspendedCanRead = await authz.can(ctx, testUser, "world:read", scope);

    await authz.removeOverride(ctx, testUser, "*", scope);
    await authz.revokeAllRoles(ctx, testUser, scope);

    return {
      ownerCanDelete,
      ownerPermissionCount: ownerSnapshot.permissions.length,
      playerCanRead,
      playerCanUpdate,
      playerPermissionCount: playerSnapshot.permissions.length,
      suspendedCanRead,
      playerPermsMatchModel,
    };
  },
});
