import { v } from "convex/values";

import type { Id } from "./_generated/dataModel.js";
import type { MutationCtx } from "./_generated/server.js";
import {
  entitledWorldMutation,
  worldMutation,
  worldQuery,
  partyQuery,
} from "./lib/customFunctions.js";
import { insertOwnedParty } from "./lib/parties/insertParty.js";
import { rateLimiter } from "./lib/rateLimiter.js";

const grantValidator = v.object({
  _id: v.id("worldPartyGrants"),
  worldId: v.id("worlds"),
  partyId: v.id("parties"),
  partyName: v.string(),
  grantedBy: v.id("users"),
  createdAt: v.number(),
});

export const listForWorld = worldQuery({
  args: {},
  returns: v.array(grantValidator),
  handler: async (ctx) => {
    await ctx.require("parties:read");
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per world bounded
    const grants = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_world", (q) => q.eq("worldId", ctx.worldDoc._id))
      .collect();

    const results: Array<{
      _id: Id<"worldPartyGrants">;
      worldId: Id<"worlds">;
      partyId: Id<"parties">;
      partyName: string;
      grantedBy: Id<"users">;
      createdAt: number;
    }> = [];

    for (const grant of grants) {
      const party = await ctx.db.get("parties", grant.partyId);
      if (!party) continue;
      results.push({
        _id: grant._id,
        worldId: grant.worldId,
        partyId: grant.partyId,
        partyName: party.name,
        grantedBy: grant.grantedBy,
        createdAt: grant.createdAt,
      });
    }

    results.sort((a, b) => b.createdAt - a.createdAt);
    return results;
  },
});

const partyGrantValidator = v.object({
  _id: v.id("worldPartyGrants"),
  worldId: v.id("worlds"),
  worldName: v.string(),
  worldIcon: v.optional(v.string()),
  worldImageFileId: v.optional(v.id("files")),
  grantedBy: v.id("users"),
  createdAt: v.number(),
});

export const listForParty = partyQuery({
  args: {},
  returns: v.array(partyGrantValidator),
  handler: async (ctx) => {
    ctx.requireOwner();
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per party bounded
    const grants = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_party", (q) => q.eq("partyId", ctx.partyDoc._id))
      .collect();

    const results: Array<{
      _id: Id<"worldPartyGrants">;
      worldId: Id<"worlds">;
      worldName: string;
      worldIcon?: string;
      worldImageFileId?: Id<"files">;
      grantedBy: Id<"users">;
      createdAt: number;
    }> = [];

    for (const grant of grants) {
      const world = await ctx.db.get("worlds", grant.worldId);
      if (!world) continue;
      results.push({
        _id: grant._id,
        worldId: grant.worldId,
        worldName: world.name,
        worldIcon: world.icon,
        worldImageFileId: world.imageFileId,
        grantedBy: grant.grantedBy,
        createdAt: grant.createdAt,
      });
    }

    results.sort((a, b) => b.createdAt - a.createdAt);
    return results;
  },
});

export const countForParty = partyQuery({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    ctx.requireOwner();
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per party bounded
    const grants = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_party", (q) => q.eq("partyId", ctx.partyDoc._id))
      .collect();

    let count = 0;
    for (const grant of grants) {
      const world = await ctx.db.get("worlds", grant.worldId);
      if (world) count += 1;
    }
    return count;
  },
});

async function grantOwnedPartyToWorld(
  ctx: MutationCtx & { userId: Id<"users">; worldDoc: { _id: Id<"worlds"> } },
  partyId: Id<"parties">,
) {
  const party = await ctx.db.get("parties", partyId);
  if (!party) {
    throw new Error("Party not found");
  }
  if (party.ownerId !== ctx.userId) {
    throw new Error("You can only grant parties you own");
  }

  const existing = await ctx.db
    .query("worldPartyGrants")
    .withIndex("by_world_and_party", (q) =>
      q.eq("worldId", ctx.worldDoc._id).eq("partyId", partyId),
    )
    .unique();
  if (existing) {
    return {
      _id: existing._id,
      worldId: existing.worldId,
      partyId: existing.partyId,
      partyName: party.name,
      grantedBy: existing.grantedBy,
      createdAt: existing.createdAt,
    };
  }

  const grantId = await ctx.db.insert("worldPartyGrants", {
    worldId: ctx.worldDoc._id,
    partyId,
    grantedBy: ctx.userId,
    createdAt: Date.now(),
  });
  const created = await ctx.db.get("worldPartyGrants", grantId);
  if (!created) {
    throw new Error("Failed to grant party access");
  }
  return {
    _id: created._id,
    worldId: created.worldId,
    partyId: created.partyId,
    partyName: party.name,
    grantedBy: created.grantedBy,
    createdAt: created.createdAt,
  };
}

export const grant = worldMutation({
  args: { partyIds: v.array(v.id("parties")) },
  returns: v.array(grantValidator),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldPartyGrant", { key: ctx.userId, throws: true });
    await ctx.require("parties:grant");

    if (args.partyIds.length === 0) {
      throw new Error("Select at least one party");
    }

    const results: Array<{
      _id: Id<"worldPartyGrants">;
      worldId: Id<"worlds">;
      partyId: Id<"parties">;
      partyName: string;
      grantedBy: Id<"users">;
      createdAt: number;
    }> = [];
    const seen = new Set<string>();
    for (const partyId of args.partyIds) {
      if (seen.has(partyId)) continue;
      seen.add(partyId);
      results.push(await grantOwnedPartyToWorld(ctx, partyId));
    }
    return results;
  },
});

export const createPartyAndGrant = entitledWorldMutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageFileId: v.optional(v.id("files")),
  },
  returns: grantValidator,
  handler: async (ctx, args) => {
    await ctx.require("parties:grant");
    await rateLimiter.limit(ctx, "partyCreateGlobal", { key: "global", throws: true });
    await rateLimiter.limit(ctx, "partyCreate", { key: ctx.userId, throws: true });
    await rateLimiter.limit(ctx, "worldPartyGrant", { key: ctx.userId, throws: true });

    const party = await insertOwnedParty(ctx, ctx.userId, args);
    return await grantOwnedPartyToWorld(ctx, party._id);
  },
});

export const revoke = worldMutation({
  args: { partyId: v.id("parties") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "worldPartyGrant", { key: ctx.userId, throws: true });
    await ctx.require("parties:revoke");

    const grant = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_world_and_party", (q) =>
        q.eq("worldId", ctx.worldDoc._id).eq("partyId", args.partyId),
      )
      .unique();
    if (!grant) {
      throw new Error("Grant not found");
    }
    await ctx.db.delete("worldPartyGrants", grant._id);
    return null;
  },
});

export const listGrantableParties = worldQuery({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("parties"),
      name: v.string(),
      description: v.optional(v.string()),
      icon: v.optional(v.string()),
      imageFileId: v.optional(v.id("files")),
    }),
  ),
  handler: async (ctx) => {
    await ctx.require("parties:grant");
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- owned parties bounded
    const owned = await ctx.db
      .query("parties")
      .withIndex("by_owner", (q) => q.eq("ownerId", ctx.userId))
      .collect();
    return owned
      .filter((party) => party.archivedAt === undefined)
      .map((party) => ({
        _id: party._id,
        name: party.name,
        description: party.description,
        icon: party.icon,
        imageFileId: party.imageFileId,
      }));
  },
});
