import { v } from "convex/values";

import { APP_CONFIG } from "./appConfig.js";
import { authz } from "./authz.js";
import { components } from "./_generated/api.js";
import type { Doc, Id } from "./_generated/dataModel.js";
import { isWorldRole, pickHighestWorldRole, worldScope, type WorldRole } from "./lib/authzModel.js";
import {
  normalizeEntityDescription,
  normalizeEntityName,
  normalizeVisualFields,
} from "./lib/entityVisual.js";
import { deleteJoinCodesForWorld } from "./lib/joinCodesCleanup.js";
import { deleteFilesForWorld } from "./lib/filesCleanup.js";
import {
  clearWorldPermissionOverrides,
  revokeAllWorldMembership,
} from "./lib/worldPermissionOverrides.js";
import { authedQuery, entitledMutation, worldMutation, worldQuery } from "./lib/customFunctions.js";
import { rateLimiter } from "./lib/rateLimiter.js";
import { canOnWorld, listWorldIdsForPartyMember } from "./lib/worldAccess.js";
import { resolveUserImageUrl } from "./lib/userImage.js";

const worldRoleValidator = v.union(
  v.literal("owner"),
  v.literal("game_master"),
  v.literal("assistant_game_master"),
  v.literal("player"),
  v.literal("world_member"),
  v.literal("party_player"),
);

const worldValidator = v.object({
  _id: v.id("worlds"),
  _creationTime: v.number(),
  ownerId: v.id("users"),
  name: v.string(),
  description: v.optional(v.string()),
  icon: v.optional(v.string()),
  imageFileId: v.optional(v.id("files")),
  updatedAt: v.number(),
  archivedAt: v.optional(v.number()),
  legacyClassId: v.optional(v.id("classes")),
});

const worldWithRoleValidator = worldValidator.extend({
  role: worldRoleValidator,
});

function deleteConfirmationPhrase(name: string): string {
  return `delete ${name}`;
}

export const listMine = authedQuery({
  args: {},
  returns: v.array(worldWithRoleValidator),
  handler: async (ctx) => {
    const roleEntries = await authz.getUserRoles(ctx, ctx.userId);
    const rolesByWorldId = new Map<string, Array<string>>();

    for (const entry of roleEntries) {
      let worldId: string | null = null;
      if (entry.scope?.type === "world") {
        worldId = entry.scope.id;
      } else if (typeof entry.scopeKey === "string" && entry.scopeKey.startsWith("world:")) {
        worldId = entry.scopeKey.slice("world:".length);
      }
      if (!worldId) continue;
      const existing = rolesByWorldId.get(worldId) ?? [];
      existing.push(entry.role);
      rolesByWorldId.set(worldId, existing);
    }

    const partyWorldIds = await listWorldIdsForPartyMember(ctx, ctx.userId);
    for (const worldId of partyWorldIds) {
      if (!rolesByWorldId.has(worldId)) {
        rolesByWorldId.set(worldId, []);
      }
    }

    const results: Array<Doc<"worlds"> & { role: WorldRole | "party_player" }> = [];

    for (const [worldId, roleNames] of rolesByWorldId) {
      const canRead = await canOnWorld(ctx, ctx.userId, worldId as Id<"worlds">, "world:read");
      if (!canRead) continue;

      const role = pickHighestWorldRole(roleNames.filter(isWorldRole));
      const resolvedRole: WorldRole | "party_player" | null =
        role ?? (partyWorldIds.includes(worldId as Id<"worlds">) ? "party_player" : null);
      if (!resolvedRole) continue;

      const worldDoc = await ctx.db.get("worlds", worldId as Id<"worlds">);
      if (!worldDoc) continue;

      results.push({ ...worldDoc, role: resolvedRole });
    }

    return results;
  },
});

export const listOwned = authedQuery({
  args: {},
  returns: v.array(worldValidator),
  handler: async (ctx) => {
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- owned worlds per user bounded
    return await ctx.db
      .query("worlds")
      .withIndex("by_owner", (q) => q.eq("ownerId", ctx.userId))
      .collect();
  },
});

export const get = authedQuery({
  args: { worldId: v.id("worlds") },
  returns: v.union(worldValidator, v.null()),
  handler: async (ctx, args) => {
    const worldDoc = await ctx.db.get("worlds", args.worldId);
    if (!worldDoc) {
      return null;
    }
    const canRead = await canOnWorld(ctx, ctx.userId, args.worldId, "world:read");
    if (!canRead) {
      return null;
    }
    return worldDoc;
  },
});

export const getByLegacyClassId = authedQuery({
  args: { classId: v.id("classes") },
  returns: v.union(worldValidator, v.null()),
  handler: async (ctx, args) => {
    const world = await ctx.db
      .query("worlds")
      .withIndex("by_legacyClassId", (q) => q.eq("legacyClassId", args.classId))
      .unique();
    if (!world) {
      return null;
    }
    const canRead = await canOnWorld(ctx, ctx.userId, world._id, "world:read");
    if (!canRead) {
      return null;
    }
    return world;
  },
});

export const create = entitledMutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageFileId: v.optional(v.id("files")),
  },
  returns: worldValidator,
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldCreateGlobal", { key: "global", throws: true });
    await rateLimiter.limit(ctx, "worldCreate", { key: ctx.userId, throws: true });
    const visual = normalizeVisualFields({
      icon: args.icon,
      imageFileId: args.imageFileId,
    });
    const now = Date.now();
    const worldId = await ctx.db.insert("worlds", {
      ownerId: ctx.userId,
      name: normalizeEntityName(args.name),
      description: normalizeEntityDescription(args.description),
      icon: visual.icon,
      imageFileId: visual.imageFileId as Id<"files"> | undefined,
      updatedAt: now,
    });
    await authz.assignRole(ctx, ctx.userId, "owner", worldScope(worldId));
    const created = await ctx.db.get("worlds", worldId);
    if (!created) {
      throw new Error("Failed to create world");
    }
    return created;
  },
});

export const update = worldMutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageFileId: v.optional(v.id("files")),
  },
  returns: worldValidator,
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldUpdate", { key: ctx.userId, throws: true });
    await ctx.require("world:update");
    const visual = normalizeVisualFields({
      icon: args.icon,
      imageFileId: args.imageFileId,
    });
    await ctx.db.patch("worlds", ctx.worldDoc._id, {
      name: normalizeEntityName(args.name),
      description: normalizeEntityDescription(args.description),
      icon: visual.icon,
      imageFileId: visual.imageFileId as Id<"files"> | undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("worlds", ctx.worldDoc._id);
    if (!updated) {
      throw new Error("Failed to update world");
    }
    return updated;
  },
});

export const setArchived = worldMutation({
  args: { archived: v.boolean() },
  returns: worldValidator,
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldArchive", { key: ctx.userId, throws: true });
    await ctx.require("world:archive");
    await ctx.db.patch("worlds", ctx.worldDoc._id, {
      archivedAt: args.archived ? Date.now() : undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("worlds", ctx.worldDoc._id);
    if (!updated) {
      throw new Error("Failed to update world archive state");
    }
    return updated;
  },
});

export const setImage = worldMutation({
  args: { fileId: v.id("files") },
  returns: worldValidator,
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldUpdate", { key: ctx.userId, throws: true });
    await ctx.require("world:update");
    const file = await ctx.db.get("files", args.fileId);
    if (!file || file.worldId !== ctx.worldDoc._id) {
      throw new Error("File not found or access denied");
    }
    if (file.preset !== "images") {
      throw new Error("Image must be an image file");
    }
    await ctx.db.patch("worlds", ctx.worldDoc._id, {
      imageFileId: args.fileId,
      icon: undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("worlds", ctx.worldDoc._id);
    if (!updated) {
      throw new Error("Failed to set world image");
    }
    return updated;
  },
});

export const clearImage = worldMutation({
  args: {},
  returns: worldValidator,
  handler: async (ctx) => {
    await rateLimiter.limit(ctx, "worldUpdate", { key: ctx.userId, throws: true });
    await ctx.require("world:update");
    await ctx.db.patch("worlds", ctx.worldDoc._id, {
      imageFileId: undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("worlds", ctx.worldDoc._id);
    if (!updated) {
      throw new Error("Failed to clear world image");
    }
    return updated;
  },
});

export const remove = worldMutation({
  args: { confirmation: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldDelete", { key: ctx.userId, throws: true });
    await ctx.require("world:delete");
    const expected = deleteConfirmationPhrase(ctx.worldDoc.name);
    if (args.confirmation !== expected) {
      throw new Error(`Type "${expected}" to confirm deletion`);
    }
    await revokeAllWorldMembership(ctx, ctx.worldDoc._id);
    await deleteJoinCodesForWorld(ctx, ctx.worldDoc._id);
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per world bounded
    const grants = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_world", (q) => q.eq("worldId", ctx.worldDoc._id))
      .collect();
    for (const grant of grants) {
      await ctx.db.delete("worldPartyGrants", grant._id);
    }
    await deleteFilesForWorld(ctx, ctx.worldDoc._id);
    await ctx.db.delete("worlds", ctx.worldDoc._id);
    return null;
  },
});

const eligibleOwnerValidator = v.object({
  userId: v.id("users"),
  name: v.optional(v.string()),
  email: v.optional(v.string()),
  image: v.optional(v.string()),
  role: v.union(v.literal("game_master"), v.literal("assistant_game_master")),
});

export const eligibleOwners = worldQuery({
  args: {},
  returns: v.array(eligibleOwnerValidator),
  handler: async (ctx) => {
    await ctx.require("world:delete");

    const byUserId = new Map<string, "game_master" | "assistant_game_master">();
    for (const role of ["game_master", "assistant_game_master"] as const) {
      const users = await ctx.runQuery(components.authz.queries.getUsersWithRole, {
        tenantId: APP_CONFIG.authzTenantId,
        role,
        scope: ctx.scope,
      });
      for (const entry of users) {
        if (entry.userId === ctx.userId) continue;
        const existing = byUserId.get(entry.userId);
        if (!existing || role === "game_master") {
          byUserId.set(entry.userId, role);
        }
      }
    }

    const results: Array<{
      userId: Id<"users">;
      name?: string;
      email?: string;
      image?: string;
      role: "game_master" | "assistant_game_master";
    }> = [];

    for (const [userId, role] of byUserId) {
      const canAct = await authz.can(ctx, userId, "world:read", ctx.scope);
      if (!canAct) continue;
      const user = await ctx.db.get("users", userId as Id<"users">);
      if (!user) continue;
      results.push({
        userId: user._id,
        name: user.name,
        email: user.email,
        image: await resolveUserImageUrl(ctx, user),
        role,
      });
    }

    results.sort((a, b) => {
      const nameA = (a.name ?? a.email ?? a.userId).toLocaleLowerCase();
      const nameB = (b.name ?? b.email ?? b.userId).toLocaleLowerCase();
      return nameA.localeCompare(nameB);
    });

    return results;
  },
});

export const transferOwnership = worldMutation({
  args: { toUserId: v.id("users") },
  returns: worldValidator,
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldTransferOwnership", { key: ctx.userId, throws: true });
    await ctx.require("world:delete");

    if (args.toUserId === ctx.userId) {
      throw new Error("You already own this world");
    }
    if (ctx.worldDoc.ownerId !== ctx.userId) {
      throw new Error("Only the current owner can transfer ownership");
    }

    const targetRoles = await authz.getUserRoles(ctx, args.toUserId, ctx.scope);
    const role = pickHighestWorldRole(
      targetRoles.map((entry: { role: string }) => entry.role).filter(isWorldRole),
    );
    if (role !== "game_master" && role !== "assistant_game_master") {
      throw new Error("Recipient must be a game master or assistant game master in this world");
    }

    const canAct = await authz.can(ctx, args.toUserId, "world:read", ctx.scope);
    if (!canAct) {
      throw new Error("Recipient is suspended and cannot receive ownership");
    }

    await authz.assignRole(ctx, args.toUserId, "owner", ctx.scope);
    await authz.revokeRole(ctx, args.toUserId, role, ctx.scope);
    await authz.revokeRole(ctx, ctx.userId, "owner", ctx.scope);
    await authz.assignRole(ctx, ctx.userId, "game_master", ctx.scope);
    await clearWorldPermissionOverrides(ctx, ctx.worldDoc._id, args.toUserId);
    await clearWorldPermissionOverrides(ctx, ctx.worldDoc._id, ctx.userId);

    await ctx.db.patch("worlds", ctx.worldDoc._id, {
      ownerId: args.toUserId,
      updatedAt: Date.now(),
    });

    const updated = await ctx.db.get("worlds", ctx.worldDoc._id);
    if (!updated) {
      throw new Error("Failed to transfer ownership");
    }
    return updated;
  },
});
