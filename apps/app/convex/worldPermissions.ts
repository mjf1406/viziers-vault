import { v } from "convex/values";

import { APP_CONFIG } from "./appConfig.js";
import { authz } from "./authz.js";
import { components } from "./_generated/api.js";
import type { Id } from "./_generated/dataModel.js";
import type { MutationCtx, QueryCtx } from "./_generated/server.js";
import {
  GRANTABLE_WORLD_PERMISSIONS,
  canManageWorldRoles,
  effectivePermissionEnabled,
  isGrantableWorldPermission,
  isPermissionOverrideTargetRole,
  isStrictlyBelow,
  isWorldRole,
  permissionsForRole,
  pickHighestWorldRole,
  worldScope,
  type PermissionOverrideEffect,
  type PermissionOverrideTargetRole,
  type WorldPermission,
} from "./lib/authzModel.js";
import {
  hasFineGrainedWorldPermissionOverrides,
  listWorldPermissionOverrides,
} from "./lib/worldPermissionOverrides.js";
import { worldMutation, worldQuery } from "./lib/customFunctions.js";
import { rateLimiter } from "./lib/rateLimiter.js";
import { resolveUserImageUrl } from "./lib/userImage.js";

const staffRoleValidator = v.union(v.literal("game_master"), v.literal("assistant_game_master"));

const staffMemberValidator = v.object({
  userId: v.id("users"),
  name: v.optional(v.string()),
  image: v.optional(v.string()),
  email: v.optional(v.string()),
  role: staffRoleValidator,
});

const permissionEntryValidator = v.object({
  permission: v.string(),
  roleDefault: v.boolean(),
  override: v.union(v.literal("allow"), v.literal("deny"), v.null()),
  effective: v.boolean(),
});

async function requirePermissionOverrideTarget(
  ctx: QueryCtx | MutationCtx,
  worldId: Id<"worlds">,
  actorUserId: Id<"users">,
  targetUserId: Id<"users">,
): Promise<PermissionOverrideTargetRole> {
  if (targetUserId === actorUserId) {
    throw new Error("You cannot edit your own permissions");
  }
  const scope = worldScope(worldId);
  const targetRoles = await authz.getUserRoles(ctx, targetUserId, scope);
  const role = pickHighestWorldRole(
    targetRoles.map((entry: { role: string }) => entry.role).filter(isWorldRole),
  );
  if (!role || !isPermissionOverrideTargetRole(role)) {
    throw new Error(
      "Only game masters and assistant game masters can receive permission overrides",
    );
  }
  return role;
}

export const listStaffForPermissions = worldQuery({
  args: {},
  returns: v.array(staffMemberValidator),
  handler: async (ctx) => {
    await ctx.require("permissions:manage");

    const byUserId = new Map<string, PermissionOverrideTargetRole>();
    for (const role of ["game_master", "assistant_game_master"] as const) {
      const users = await ctx.runQuery(components.authz.queries.getUsersWithRole, {
        tenantId: APP_CONFIG.authzTenantId,
        role,
        scope: ctx.scope,
      });
      for (const entry of users) {
        const existing = byUserId.get(entry.userId);
        const next = pickHighestWorldRole([...(existing ? [existing] : []), role]);
        if (next && isPermissionOverrideTargetRole(next)) {
          byUserId.set(entry.userId, next);
        }
      }
    }

    const members: Array<{
      userId: Id<"users">;
      name?: string;
      image?: string;
      email?: string;
      role: PermissionOverrideTargetRole;
    }> = [];

    for (const [userId, role] of byUserId) {
      if (userId === ctx.userId) continue;
      const user = await ctx.db.get("users", userId as Id<"users">);
      if (!user) continue;
      members.push({
        userId: user._id,
        name: user.name,
        image: await resolveUserImageUrl(ctx, user),
        email: user.email,
        role,
      });
    }

    members.sort((a, b) => {
      const byRole = a.role.localeCompare(b.role);
      if (byRole !== 0) return byRole;
      const nameA = (a.name ?? a.email ?? a.userId).toLocaleLowerCase();
      const nameB = (b.name ?? b.email ?? b.userId).toLocaleLowerCase();
      return nameA.localeCompare(nameB);
    });

    return members;
  },
});

export const forMember = worldQuery({
  args: { userId: v.id("users") },
  returns: v.object({
    userId: v.id("users"),
    role: staffRoleValidator,
    permissions: v.array(permissionEntryValidator),
  }),
  handler: async (ctx, args) => {
    await ctx.require("permissions:manage");
    const role = await requirePermissionOverrideTarget(
      ctx,
      ctx.worldDoc._id,
      ctx.userId,
      args.userId,
    );
    const rolePerms = new Set(permissionsForRole(role));
    const overrides = await listWorldPermissionOverrides(ctx, ctx.worldDoc._id, args.userId);
    const overrideByPermission = new Map<string, PermissionOverrideEffect>();
    for (const row of overrides) {
      if (row.permission === "*") continue;
      if (!isGrantableWorldPermission(row.permission)) continue;
      overrideByPermission.set(row.permission, row.effect);
    }

    const permissions = GRANTABLE_WORLD_PERMISSIONS.map((permission) => {
      const roleDefault = rolePerms.has(permission);
      const override = overrideByPermission.get(permission) ?? null;
      return {
        permission,
        roleDefault,
        override,
        effective: effectivePermissionEnabled(roleDefault, override),
      };
    });

    return { userId: args.userId, role, permissions };
  },
});

export const hasPermissionOverrides = worldQuery({
  args: { userId: v.id("users") },
  returns: v.object({ hasOverrides: v.boolean() }),
  handler: async (ctx, args) => {
    const actorRoles = await authz.getUserRoles(ctx, ctx.userId, ctx.scope);
    const actorRole = pickHighestWorldRole(
      actorRoles.map((entry: { role: string }) => entry.role).filter(isWorldRole),
    );
    if (!actorRole || !canManageWorldRoles(actorRole)) {
      throw new Error("Only owners and game masters can check permission overrides");
    }

    const targetRoles = await authz.getUserRoles(ctx, args.userId, ctx.scope);
    const targetRole = pickHighestWorldRole(
      targetRoles.map((entry: { role: string }) => entry.role).filter(isWorldRole),
    );
    if (!targetRole) {
      throw new Error("Person is not in this world");
    }
    if (!isStrictlyBelow(actorRole, targetRole)) {
      throw new Error("You can only inspect permission overrides for people below you");
    }

    const hasOverrides = await hasFineGrainedWorldPermissionOverrides(
      ctx,
      ctx.worldDoc._id,
      args.userId,
    );
    return { hasOverrides };
  },
});

export const setMemberPermission = worldMutation({
  args: {
    userId: v.id("users"),
    permission: v.string(),
    enabled: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "memberSetPermission", { key: ctx.userId, throws: true });
    await ctx.require("permissions:manage");

    if (!isGrantableWorldPermission(args.permission)) {
      throw new Error("This permission cannot be overridden");
    }
    const permission: WorldPermission = args.permission;
    const role = await requirePermissionOverrideTarget(
      ctx,
      ctx.worldDoc._id,
      ctx.userId,
      args.userId,
    );
    const roleDefault = permissionsForRole(role).includes(permission);

    if (args.enabled) {
      if (roleDefault) {
        await authz.removeOverride(ctx, args.userId, permission, ctx.scope);
      } else {
        await authz.grantPermission(
          ctx,
          args.userId,
          permission,
          ctx.scope,
          "World permission override",
        );
      }
    } else if (roleDefault) {
      await authz.denyPermission(
        ctx,
        args.userId,
        permission,
        ctx.scope,
        "World permission override",
      );
    } else {
      await authz.removeOverride(ctx, args.userId, permission, ctx.scope);
    }

    return null;
  },
});
