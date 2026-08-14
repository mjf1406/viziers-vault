import { ConvexError, v } from "convex/values";
import { customMutation, customQuery } from "convex-helpers/server/customFunctions";

import type { Doc, Id } from "../_generated/dataModel.js";
import type { MutationCtx, QueryCtx } from "../_generated/server.js";
import { mutation, query } from "../_generated/server.js";
import type { WorldPermission } from "./authzModel.js";
import { worldScope } from "./authzModel.js";
import { requireAuthUserId } from "./auth.js";
import { assertEntitled } from "./entitlement.js";
import { canReadParty } from "./partyMembership.js";
import { canOnWorld } from "./worldAccess.js";

type AuthedCtx = (QueryCtx | MutationCtx) & { userId: Id<"users"> };

async function loadWorldContext(ctx: AuthedCtx, worldId: Id<"worlds">) {
  const worldDoc = await ctx.db.get("worlds", worldId);
  if (!worldDoc) {
    throw new ConvexError({
      code: "WORLD_UNAVAILABLE",
      message: "World not found or access denied",
    });
  }
  const scope = worldScope(worldId);

  const requirePermission = async (permission: WorldPermission) => {
    try {
      const allowed = await canOnWorld(ctx, ctx.userId, worldId, permission);
      if (!allowed) {
        throw new Error("denied");
      }
    } catch {
      if (permission !== "world:read") {
        console.error("World permission denied", {
          worldId,
          userId: ctx.userId,
          permission,
        });
      }
      throw new ConvexError({
        code: "WORLD_UNAVAILABLE",
        message: "World not found or access denied",
      });
    }
  };

  await requirePermission("world:read");

  return {
    worldDoc: worldDoc as Doc<"worlds">,
    scope,
    can: (permission: WorldPermission) => canOnWorld(ctx, ctx.userId, worldId, permission),
    require: requirePermission,
  };
}

async function loadPartyContext(ctx: AuthedCtx, partyId: Id<"parties">) {
  const partyDoc = await ctx.db.get("parties", partyId);
  if (!partyDoc) {
    throw new ConvexError({
      code: "PARTY_UNAVAILABLE",
      message: "Party not found or access denied",
    });
  }
  const canRead = await canReadParty(ctx, partyId, ctx.userId);
  if (!canRead) {
    throw new ConvexError({
      code: "PARTY_UNAVAILABLE",
      message: "Party not found or access denied",
    });
  }
  const isOwner = partyDoc.ownerId === ctx.userId;

  const requireOwner = () => {
    if (!isOwner) {
      throw new ConvexError({
        code: "PARTY_UNAVAILABLE",
        message: "Party not found or access denied",
      });
    }
  };

  return {
    partyDoc: partyDoc as Doc<"parties">,
    isOwner,
    requireOwner,
  };
}

export const authedMutation = customMutation(mutation, {
  args: {},
  input: async (ctx) => {
    const userId = await requireAuthUserId(ctx);
    return { ctx: { userId }, args: {} };
  },
});

export const entitledMutation = customMutation(mutation, {
  args: {},
  input: async (ctx) => {
    const userId = await requireAuthUserId(ctx);
    await assertEntitled(ctx, userId);
    return { ctx: { userId }, args: {} };
  },
});

export const authedQuery = customQuery(query, {
  args: {},
  input: async (ctx) => {
    const userId = await requireAuthUserId(ctx);
    return { ctx: { userId }, args: {} };
  },
});

export const entitledQuery = customQuery(query, {
  args: {},
  input: async (ctx) => {
    const userId = await requireAuthUserId(ctx);
    await assertEntitled(ctx, userId);
    return { ctx: { userId }, args: {} };
  },
});

export const worldMutation = customMutation(mutation, {
  args: { worldId: v.id("worlds") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    const worldCtx = await loadWorldContext({ ...ctx, userId }, args.worldId);
    return {
      ctx: {
        userId,
        ...worldCtx,
      },
      args: {},
    };
  },
});

export const entitledWorldMutation = customMutation(mutation, {
  args: { worldId: v.id("worlds") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    await assertEntitled(ctx, userId);
    const worldCtx = await loadWorldContext({ ...ctx, userId }, args.worldId);
    return {
      ctx: {
        userId,
        ...worldCtx,
      },
      args: {},
    };
  },
});

export const worldQuery = customQuery(query, {
  args: { worldId: v.id("worlds") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    const worldCtx = await loadWorldContext({ ...ctx, userId }, args.worldId);
    return {
      ctx: {
        userId,
        ...worldCtx,
      },
      args: {},
    };
  },
});

export const partyMutation = customMutation(mutation, {
  args: { partyId: v.id("parties") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    const partyCtx = await loadPartyContext({ ...ctx, userId }, args.partyId);
    return {
      ctx: {
        userId,
        ...partyCtx,
      },
      args: {},
    };
  },
});

export const entitledPartyMutation = customMutation(mutation, {
  args: { partyId: v.id("parties") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    await assertEntitled(ctx, userId);
    const partyCtx = await loadPartyContext({ ...ctx, userId }, args.partyId);
    return {
      ctx: {
        userId,
        ...partyCtx,
      },
      args: {},
    };
  },
});

export const partyQuery = customQuery(query, {
  args: { partyId: v.id("parties") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    const partyCtx = await loadPartyContext({ ...ctx, userId }, args.partyId);
    return {
      ctx: {
        userId,
        ...partyCtx,
      },
      args: {},
    };
  },
});

/** @deprecated Legacy class scope — redirects and migration only. */
async function loadClassContext(ctx: AuthedCtx, classId: Id<"classes">) {
  const classDoc = await ctx.db.get("classes", classId);
  if (!classDoc) {
    throw new ConvexError({
      code: "CLASS_UNAVAILABLE",
      message: "Class not found or access denied",
    });
  }
  const world = await ctx.db
    .query("worlds")
    .withIndex("by_legacyClassId", (q) => q.eq("legacyClassId", classId))
    .unique();
  if (world) {
    return await loadWorldContext(ctx, world._id);
  }
  throw new ConvexError({
    code: "CLASS_UNAVAILABLE",
    message: "Class not found or access denied",
  });
}

export const classQuery = customQuery(query, {
  args: { classId: v.id("classes") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    const worldCtx = await loadClassContext({ ...ctx, userId }, args.classId);
    return {
      ctx: {
        userId,
        classDoc: await ctx.db.get("classes", args.classId),
        ...worldCtx,
      },
      args: {},
    };
  },
});

export const classMutation = customMutation(mutation, {
  args: { classId: v.id("classes") },
  input: async (ctx, args) => {
    const userId = await requireAuthUserId(ctx);
    const worldCtx = await loadClassContext({ ...ctx, userId }, args.classId);
    return {
      ctx: {
        userId,
        classDoc: await ctx.db.get("classes", args.classId),
        ...worldCtx,
      },
      args: {},
    };
  },
});
