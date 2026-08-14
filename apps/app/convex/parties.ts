import { v } from "convex/values";

import type { Doc, Id } from "./_generated/dataModel.js";
import {
  normalizeEntityDescription,
  normalizeEntityName,
  normalizeVisualFields,
} from "./lib/entityVisual.js";
import { deleteJoinCodesForParty } from "./lib/joinCodesCleanup.js";
import { insertOwnedParty } from "./lib/parties/insertParty.js";
import { deleteFilesForParty } from "./lib/filesCleanup.js";
import { authedQuery, entitledMutation, partyMutation } from "./lib/customFunctions.js";
import { listPartyMemberships } from "./lib/partyMembership.js";
import { rateLimiter } from "./lib/rateLimiter.js";
import { canReadParty } from "./lib/partyMembership.js";

const partyValidator = v.object({
  _id: v.id("parties"),
  _creationTime: v.number(),
  ownerId: v.id("users"),
  name: v.string(),
  description: v.optional(v.string()),
  icon: v.optional(v.string()),
  imageFileId: v.optional(v.id("files")),
  updatedAt: v.number(),
  archivedAt: v.optional(v.number()),
});

const partyWithRoleValidator = partyValidator.extend({
  role: v.union(v.literal("owner"), v.literal("leader"), v.literal("member")),
});

function deleteConfirmationPhrase(name: string): string {
  return `delete ${name}`;
}

export const listMine = authedQuery({
  args: {},
  returns: v.array(partyWithRoleValidator),
  handler: async (ctx) => {
    const results: Array<Doc<"parties"> & { role: "owner" | "leader" | "member" }> = [];

    // eslint-disable-next-line @convex-dev/no-collect-in-query -- owned parties bounded
    const owned = await ctx.db
      .query("parties")
      .withIndex("by_owner", (q) => q.eq("ownerId", ctx.userId))
      .collect();
    for (const party of owned) {
      results.push({ ...party, role: "owner" });
    }

    // eslint-disable-next-line @convex-dev/no-collect-in-query -- memberships per user bounded
    const memberships = await ctx.db
      .query("partyMemberships")
      .withIndex("by_user", (q) => q.eq("userId", ctx.userId))
      .collect();

    for (const membership of memberships) {
      const party = await ctx.db.get("parties", membership.partyId);
      if (!party) continue;
      if (party.ownerId === ctx.userId) continue;
      results.push({ ...party, role: membership.role });
    }

    return results;
  },
});

export const listOwned = authedQuery({
  args: {},
  returns: v.array(partyValidator),
  handler: async (ctx) => {
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- owned parties bounded
    return await ctx.db
      .query("parties")
      .withIndex("by_owner", (q) => q.eq("ownerId", ctx.userId))
      .collect();
  },
});

export const get = authedQuery({
  args: { partyId: v.id("parties") },
  returns: v.union(partyValidator, v.null()),
  handler: async (ctx, args) => {
    const party = await ctx.db.get("parties", args.partyId);
    if (!party) {
      return null;
    }
    const canRead = await canReadParty(ctx, args.partyId, ctx.userId);
    if (!canRead) {
      return null;
    }
    return party;
  },
});

export const create = entitledMutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageFileId: v.optional(v.id("files")),
  },
  returns: partyValidator,
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "partyCreateGlobal", { key: "global", throws: true });
    await rateLimiter.limit(ctx, "partyCreate", { key: ctx.userId, throws: true });
    return await insertOwnedParty(ctx, ctx.userId, args);
  },
});

export const update = partyMutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageFileId: v.optional(v.id("files")),
  },
  returns: partyValidator,
  handler: async (ctx, args) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyUpdate", { key: ctx.userId, throws: true });
    const visual = normalizeVisualFields({
      icon: args.icon,
      imageFileId: args.imageFileId,
    });
    await ctx.db.patch("parties", ctx.partyDoc._id, {
      name: normalizeEntityName(args.name),
      description: normalizeEntityDescription(args.description),
      icon: visual.icon,
      imageFileId: visual.imageFileId as Id<"files"> | undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("parties", ctx.partyDoc._id);
    if (!updated) {
      throw new Error("Failed to update party");
    }
    return updated;
  },
});

export const setArchived = partyMutation({
  args: { archived: v.boolean() },
  returns: partyValidator,
  handler: async (ctx, args) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyArchive", { key: ctx.userId, throws: true });
    await ctx.db.patch("parties", ctx.partyDoc._id, {
      archivedAt: args.archived ? Date.now() : undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("parties", ctx.partyDoc._id);
    if (!updated) {
      throw new Error("Failed to update party archive state");
    }
    return updated;
  },
});

export const setImage = partyMutation({
  args: { fileId: v.id("files") },
  returns: partyValidator,
  handler: async (ctx, args) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyUpdate", { key: ctx.userId, throws: true });
    const file = await ctx.db.get("files", args.fileId);
    if (!file || file.partyId !== ctx.partyDoc._id) {
      throw new Error("File not found or access denied");
    }
    if (file.preset !== "images") {
      throw new Error("Image must be an image file");
    }
    await ctx.db.patch("parties", ctx.partyDoc._id, {
      imageFileId: args.fileId,
      icon: undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("parties", ctx.partyDoc._id);
    if (!updated) {
      throw new Error("Failed to set party image");
    }
    return updated;
  },
});

export const clearImage = partyMutation({
  args: {},
  returns: partyValidator,
  handler: async (ctx) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyUpdate", { key: ctx.userId, throws: true });
    await ctx.db.patch("parties", ctx.partyDoc._id, {
      imageFileId: undefined,
      updatedAt: Date.now(),
    });
    const updated = await ctx.db.get("parties", ctx.partyDoc._id);
    if (!updated) {
      throw new Error("Failed to clear party image");
    }
    return updated;
  },
});

export const remove = partyMutation({
  args: { confirmation: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyDelete", { key: ctx.userId, throws: true });
    const expected = deleteConfirmationPhrase(ctx.partyDoc.name);
    if (args.confirmation !== expected) {
      throw new Error(`Type "${expected}" to confirm deletion`);
    }
    const memberships = await listPartyMemberships(ctx, ctx.partyDoc._id);
    for (const membership of memberships) {
      await ctx.db.delete("partyMemberships", membership._id);
    }
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- grants per party bounded
    const grants = await ctx.db
      .query("worldPartyGrants")
      .withIndex("by_party", (q) => q.eq("partyId", ctx.partyDoc._id))
      .collect();
    for (const grant of grants) {
      await ctx.db.delete("worldPartyGrants", grant._id);
    }
    await deleteJoinCodesForParty(ctx, ctx.partyDoc._id);
    await deleteFilesForParty(ctx, ctx.partyDoc._id);
    await ctx.db.delete("parties", ctx.partyDoc._id);
    return null;
  },
});
