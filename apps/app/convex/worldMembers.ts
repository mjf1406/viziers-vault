import { v } from "convex/values";

import { APP_CONFIG } from "./appConfig.js";
import { authz } from "./authz.js";
import { components } from "./_generated/api.js";
import type { Id } from "./_generated/dataModel.js";
import {
  JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE,
  MEMBER_LIST_AUTHZ_ROLES,
  MEMBER_LIST_READ_PERMISSION_BY_ROLE,
  REMOVE_PERMISSION_BY_ROLE,
  SUSPEND_PERMISSION_BY_ROLE,
  canManageWorldRoles,
  isStrictlyBelow,
  isWorldJoinCodeRole,
  isWorldRole,
  pickHighestWorldRole,
  type MemberListRole,
  type WorldJoinCodeRole,
  type WorldRole,
} from "./lib/authzModel.js";
import { clearWorldPermissionOverrides } from "./lib/worldPermissionOverrides.js";
import { worldMutation, worldQuery } from "./lib/customFunctions.js";
import { rateLimiter } from "./lib/rateLimiter.js";
import { listPartyMemberships } from "./lib/partyMembership.js";
import { resolveUserImageUrl } from "./lib/userImage.js";
import { isSelfHosted } from "./lib/selfHosted.js";

const memberListRoleValidator = v.union(
  v.literal("game_master"),
  v.literal("assistant_game_master"),
);

const worldStaffRoleValidator = v.union(
  v.literal("owner"),
  v.literal("game_master"),
  v.literal("assistant_game_master"),
);

const worldMemberValidator = v.object({
  userId: v.id("users"),
  name: v.optional(v.string()),
  image: v.optional(v.string()),
  email: v.optional(v.string()),
  role: worldStaffRoleValidator,
});

const partyPlayerValidator = v.object({
  userId: v.id("users"),
  name: v.optional(v.string()),
  image: v.optional(v.string()),
  email: v.optional(v.string()),
  partyId: v.id("parties"),
  partyName: v.string(),
  partyRole: v.union(v.literal("leader"), v.literal("member")),
});

export const setSuspended = worldMutation({
  args: {
    userId: v.id("users"),
    suspended: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "memberSuspend", { key: ctx.userId, throws: true });
    if (args.userId === ctx.userId) {
      throw new Error("You cannot suspend yourself");
    }

    const targetRoles = await authz.getUserRoles(ctx, args.userId, ctx.scope);
    const role = pickHighestWorldRole(
      targetRoles.map((entry: { role: string }) => entry.role).filter(isWorldRole),
    );
    if (!role) {
      throw new Error("Person is not in this world");
    }

    const permission = SUSPEND_PERMISSION_BY_ROLE[role];
    if (!permission) {
      throw new Error("This person cannot be suspended");
    }
    await ctx.require(permission);

    if (args.suspended) {
      await authz.denyPermission(ctx, args.userId, "*", ctx.scope, "Suspended from world");
    } else {
      await authz.removeOverride(ctx, args.userId, "*", ctx.scope);
    }
    return null;
  },
});

export const listStaffByRole = worldQuery({
  args: { role: memberListRoleValidator },
  returns: v.array(worldMemberValidator),
  handler: async (ctx, args) => {
    if (!isWorldJoinCodeRole(args.role)) {
      throw new Error("Invalid member list role");
    }
    const listRole: MemberListRole = args.role;
    await ctx.require(MEMBER_LIST_READ_PERMISSION_BY_ROLE[listRole]);

    const authzRoles = MEMBER_LIST_AUTHZ_ROLES[listRole];
    const byUserId = new Map<string, "owner" | "game_master" | "assistant_game_master">();

    for (const authzRole of authzRoles) {
      const users = await ctx.runQuery(components.authz.queries.getUsersWithRole, {
        tenantId: APP_CONFIG.authzTenantId,
        role: authzRole,
        scope: ctx.scope,
      });
      for (const entry of users) {
        const existing = byUserId.get(entry.userId);
        const next = pickHighestWorldRole([...(existing ? [existing] : []), authzRole]);
        if (next === "owner" || next === "game_master" || next === "assistant_game_master") {
          byUserId.set(entry.userId, next);
        }
      }
    }

    const includeEmail =
      isSelfHosted() || listRole === "game_master" || listRole === "assistant_game_master";

    const members: Array<{
      userId: Id<"users">;
      name?: string;
      image?: string;
      email?: string;
      role: "owner" | "game_master" | "assistant_game_master";
    }> = [];

    for (const [userId, role] of byUserId) {
      const user = await ctx.db.get("users", userId as Id<"users">);
      if (!user) continue;
      members.push({
        userId: user._id,
        name: user.name,
        image: await resolveUserImageUrl(ctx, user),
        email: includeEmail ? user.email : undefined,
        role,
      });
    }

    members.sort((a, b) => {
      const roleRank = (role: WorldRole) => (role === "owner" ? 0 : 1);
      const byRole = roleRank(a.role) - roleRank(b.role);
      if (byRole !== 0) return byRole;
      const nameA = (a.name ?? a.email ?? a.userId).toLocaleLowerCase();
      const nameB = (b.name ?? b.email ?? b.userId).toLocaleLowerCase();
      return nameA.localeCompare(nameB);
    });

    return members;
  },
});

export const listPartyPlayers = worldQuery({
  args: {},
  returns: v.array(partyPlayerValidator),
  handler: async (ctx) => {
    await ctx.require("players:read");

    // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per world bounded
    const grants = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_world", (q) => q.eq("worldId", ctx.worldDoc._id))
      .collect();

    const players: Array<{
      userId: Id<"users">;
      name?: string;
      image?: string;
      email?: string;
      partyId: Id<"parties">;
      partyName: string;
      partyRole: "leader" | "member";
    }> = [];

    for (const grant of grants) {
      const party = await ctx.db.get("parties", grant.partyId);
      if (!party) continue;
      const memberships = await listPartyMemberships(ctx, grant.partyId);
      for (const membership of memberships) {
        const user = await ctx.db.get("users", membership.userId);
        if (!user) continue;
        players.push({
          userId: user._id,
          name: user.name,
          image: await resolveUserImageUrl(ctx, user),
          email: isSelfHosted() ? user.email : undefined,
          partyId: party._id,
          partyName: party.name,
          partyRole: membership.role,
        });
      }
    }

    players.sort((a, b) => {
      const nameA = (a.name ?? a.email ?? a.userId).toLocaleLowerCase();
      const nameB = (b.name ?? b.email ?? b.userId).toLocaleLowerCase();
      return nameA.localeCompare(nameB);
    });

    return players;
  },
});

export const countsByRole = worldQuery({
  args: {},
  returns: v.object({
    game_master: v.union(v.number(), v.null()),
    assistant_game_master: v.union(v.number(), v.null()),
    players: v.union(v.number(), v.null()),
  }),
  handler: async (ctx) => {
    const counts: {
      game_master: number | null;
      assistant_game_master: number | null;
      players: number | null;
    } = {
      game_master: null,
      assistant_game_master: null,
      players: null,
    };

    for (const listRole of ["game_master", "assistant_game_master"] as const) {
      const allowed = await ctx.can(MEMBER_LIST_READ_PERMISSION_BY_ROLE[listRole]);
      if (!allowed) continue;
      const userIds = new Set<string>();
      for (const authzRole of MEMBER_LIST_AUTHZ_ROLES[listRole]) {
        const users = await ctx.runQuery(components.authz.queries.getUsersWithRole, {
          tenantId: APP_CONFIG.authzTenantId,
          role: authzRole,
          scope: ctx.scope,
        });
        for (const entry of users) {
          userIds.add(entry.userId);
        }
      }
      counts[listRole] = userIds.size;
    }

    const canReadPlayers = await ctx.can("players:read");
    if (canReadPlayers) {
      // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per world bounded
      const grants = await ctx.db
        .query("worldPartyGrants")
        .withIndex("by_world", (q) => q.eq("worldId", ctx.worldDoc._id))
        .collect();
      let playerCount = 0;
      for (const grant of grants) {
        const memberships = await listPartyMemberships(ctx, grant.partyId);
        playerCount += memberships.length;
      }
      counts.players = playerCount;
    }

    return counts;
  },
});

export const remove = worldMutation({
  args: { userId: v.id("users") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "memberRemove", { key: ctx.userId, throws: true });
    if (args.userId === ctx.userId) {
      throw new Error("You cannot remove yourself");
    }

    const targetRoles = await authz.getUserRoles(ctx, args.userId, ctx.scope);
    const role = pickHighestWorldRole(
      targetRoles.map((entry: { role: string }) => entry.role).filter(isWorldRole),
    );
    if (!role) {
      throw new Error("Person is not in this world");
    }

    const permission = REMOVE_PERMISSION_BY_ROLE[role];
    if (!permission) {
      throw new Error("This person cannot be removed");
    }
    await ctx.require(permission);

    await authz.offboardUser(ctx, args.userId, {
      scope: ctx.scope,
      removeOverrides: true,
      removeRelationships: true,
      removeAttributes: false,
    });
    return null;
  },
});

export const setRole = worldMutation({
  args: {
    userId: v.id("users"),
    role: memberListRoleValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "memberSetRole", { key: ctx.userId, throws: true });
    if (args.userId === ctx.userId) {
      throw new Error("You cannot change your own role");
    }
    if (!isWorldJoinCodeRole(args.role)) {
      throw new Error("Invalid role");
    }
    const newRole: WorldJoinCodeRole = args.role;

    const actorRoleEntries = await authz.getUserRoles(ctx, ctx.userId, ctx.scope);
    const actorRole = pickHighestWorldRole(
      actorRoleEntries.map((entry: { role: string }) => entry.role).filter(isWorldRole),
    );
    if (!actorRole || !canManageWorldRoles(actorRole)) {
      throw new Error("Only owners and game masters can change roles");
    }
    if (!isStrictlyBelow(actorRole, newRole)) {
      throw new Error("You cannot assign a role at or above your own");
    }

    const targetRoleEntries = await authz.getUserRoles(ctx, args.userId, ctx.scope);
    const targetWorldRoles = targetRoleEntries
      .map((entry: { role: string }) => entry.role)
      .filter(isWorldRole);
    const fromRole = pickHighestWorldRole(targetWorldRoles);
    if (!fromRole) {
      throw new Error("Person is not in this world");
    }
    if (!isStrictlyBelow(actorRole, fromRole)) {
      throw new Error("You can only change roles of people below you");
    }
    if (fromRole === newRole) {
      return null;
    }

    const removePermission = REMOVE_PERMISSION_BY_ROLE[fromRole];
    if (!removePermission) {
      throw new Error("This person's role cannot be changed");
    }
    await ctx.require(removePermission);
    await ctx.require(JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE[newRole]);

    const uniqueWorldRoles = [...new Set<WorldRole>(targetWorldRoles)];
    for (const role of uniqueWorldRoles) {
      await authz.revokeRole(ctx, args.userId, role, ctx.scope);
    }
    await authz.assignRole(ctx, args.userId, newRole, ctx.scope);
    await clearWorldPermissionOverrides(ctx, ctx.worldDoc._id, args.userId);
    return null;
  },
});
