import type { Doc } from "./_generated/dataModel.js";
import type { MutationCtx } from "./_generated/server.js";
import { internal } from "./_generated/api.js";
import { authz } from "./authz.js";
import {
  authedMutation,
  partyMutation,
  partyQuery,
  worldMutation,
  worldQuery,
} from "./lib/customFunctions.js";
import { deleteJoinCodeById } from "./lib/joinCodesCleanup.js";
import { rateLimiter } from "./lib/rateLimiter.js";
import {
  JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE,
  isPartyJoinCodeRole,
  isWorldJoinCodeRole,
  isWorldRole,
  pickHighestWorldRole,
  worldScope,
  type PartyJoinCodeRole,
  type WorldJoinCodeRole,
} from "./lib/authzModel.js";
import { getPartyLeader, getPartyMembership } from "./lib/partyMembership.js";
import { ConvexError, v } from "convex/values";
import { internalMutation } from "./_generated/server.js";

const CODE_LENGTH = 6;
const MAX_TTL_MS = 24 * 60 * 60 * 1000;
const MIN_USES = 1;
const MAX_USES = 100;
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_GENERATE_ATTEMPTS = 12;

const worldJoinCodeRoleValidator = v.union(
  v.literal("game_master"),
  v.literal("assistant_game_master"),
);

const partyJoinCodeRoleValidator = v.union(v.literal("leader"), v.literal("member"));

const joinCodeValidator = v.object({
  _id: v.id("joinCodes"),
  _creationTime: v.number(),
  code: v.string(),
  targetKind: v.union(v.literal("world"), v.literal("party"), v.literal("class")),
  worldId: v.optional(v.id("worlds")),
  partyId: v.optional(v.id("parties")),
  classId: v.optional(v.id("classes")),
  createdBy: v.id("users"),
  role: v.string(),
  expiresAt: v.number(),
  maxUses: v.number(),
  useCount: v.number(),
});

function normalizeJoinCode(code: string): string {
  const normalized = code
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  if (normalized.length !== CODE_LENGTH) {
    throw new Error("Invite code must be 6 characters");
  }
  return normalized;
}

function normalizeMaxUses(maxUses: number): number {
  if (!Number.isInteger(maxUses) || maxUses < MIN_USES || maxUses > MAX_USES) {
    throw new Error(`Uses must be an integer between ${MIN_USES} and ${MAX_USES}`);
  }
  return maxUses;
}

function normalizeTtlMs(ttlMs: number): number {
  if (!Number.isFinite(ttlMs) || ttlMs <= 0 || ttlMs > MAX_TTL_MS) {
    throw new Error("Expiry must be between 1 second and 24 hours");
  }
  return ttlMs;
}

function randomCode(): string {
  const bytes = new Uint8Array(CODE_LENGTH);
  crypto.getRandomValues(bytes);
  let result = "";
  for (const byte of bytes) {
    result += CODE_ALPHABET[byte % CODE_ALPHABET.length];
  }
  return result;
}

async function generateUniqueCode(ctx: MutationCtx): Promise<string> {
  for (let attempt = 0; attempt < CODE_GENERATE_ATTEMPTS; attempt += 1) {
    const code = randomCode();
    const existing = await ctx.db
      .query("joinCodes")
      .withIndex("by_code", (q) => q.eq("code", code))
      .unique();
    if (!existing) {
      return code;
    }
  }
  throw new Error("Could not generate a unique invite code");
}

function toPublicJoinCode(doc: Doc<"joinCodes">) {
  return {
    _id: doc._id,
    _creationTime: doc._creationTime,
    code: doc.code,
    targetKind: doc.targetKind,
    worldId: doc.worldId,
    partyId: doc.partyId,
    classId: doc.classId,
    createdBy: doc.createdBy,
    role: doc.role,
    expiresAt: doc.expiresAt,
    maxUses: doc.maxUses,
    useCount: doc.useCount,
  };
}

export const listForWorld = worldQuery({
  args: { now: v.number() },
  returns: v.array(joinCodeValidator),
  handler: async (ctx, args) => {
    await ctx.require("invitations:read");
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- bounded invitation list
    const codes = await ctx.db
      .query("joinCodes")
      .withIndex("by_world", (q) => q.eq("worldId", ctx.worldDoc._id))
      .collect();
    return codes
      .filter((code) => code.expiresAt > args.now && code.useCount < code.maxUses)
      .map(toPublicJoinCode)
      .sort((a, b) => b._creationTime - a._creationTime);
  },
});

export const listForParty = partyQuery({
  args: { now: v.number() },
  returns: v.array(joinCodeValidator),
  handler: async (ctx, args) => {
    ctx.requireOwner();
    // eslint-disable-next-line @convex-dev/no-collect-in-query -- bounded invitation list
    const codes = await ctx.db
      .query("joinCodes")
      .withIndex("by_party", (q) => q.eq("partyId", ctx.partyDoc._id))
      .collect();
    return codes
      .filter((code) => code.expiresAt > args.now && code.useCount < code.maxUses)
      .map(toPublicJoinCode)
      .sort((a, b) => b._creationTime - a._creationTime);
  },
});

export const createForWorld = worldMutation({
  args: {
    role: worldJoinCodeRoleValidator,
    ttlMs: v.number(),
    maxUses: v.number(),
  },
  returns: joinCodeValidator,
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "joinCodeCreate", { key: ctx.userId, throws: true });
    await ctx.require("invitations:create");

    if (ctx.worldDoc.archivedAt !== undefined) {
      throw new Error("Cannot create invite codes for an archived world");
    }
    if (!isWorldJoinCodeRole(args.role)) {
      throw new Error("Invalid invite role");
    }
    await ctx.require(JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE[args.role]);

    const ttlMs = normalizeTtlMs(args.ttlMs);
    const maxUses = normalizeMaxUses(args.maxUses);
    const now = Date.now();
    const expiresAt = now + ttlMs;
    const code = await generateUniqueCode(ctx);

    const joinCodeId = await ctx.db.insert("joinCodes", {
      code,
      targetKind: "world",
      worldId: ctx.worldDoc._id,
      createdBy: ctx.userId,
      role: args.role,
      expiresAt,
      maxUses,
      useCount: 0,
    });

    const expirationJobId = await ctx.scheduler.runAt(expiresAt, internal.joinCodes.deleteExpired, {
      joinCodeId,
    });
    await ctx.db.patch("joinCodes", joinCodeId, { expirationJobId });

    const created = await ctx.db.get("joinCodes", joinCodeId);
    if (!created) {
      throw new Error("Failed to create invite code");
    }
    return toPublicJoinCode(created);
  },
});

export const createForParty = partyMutation({
  args: {
    role: partyJoinCodeRoleValidator,
    ttlMs: v.number(),
    maxUses: v.number(),
  },
  returns: joinCodeValidator,
  handler: async (ctx, args) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "joinCodeCreate", { key: ctx.userId, throws: true });

    if (ctx.partyDoc.archivedAt !== undefined) {
      throw new Error("Cannot create invite codes for an archived party");
    }
    if (!isPartyJoinCodeRole(args.role)) {
      throw new Error("Invalid invite role");
    }

    const ttlMs = normalizeTtlMs(args.ttlMs);
    const maxUses = normalizeMaxUses(args.maxUses);
    const now = Date.now();
    const expiresAt = now + ttlMs;
    const code = await generateUniqueCode(ctx);

    const joinCodeId = await ctx.db.insert("joinCodes", {
      code,
      targetKind: "party",
      partyId: ctx.partyDoc._id,
      createdBy: ctx.userId,
      role: args.role,
      expiresAt,
      maxUses,
      useCount: 0,
    });

    const expirationJobId = await ctx.scheduler.runAt(expiresAt, internal.joinCodes.deleteExpired, {
      joinCodeId,
    });
    await ctx.db.patch("joinCodes", joinCodeId, { expirationJobId });

    const created = await ctx.db.get("joinCodes", joinCodeId);
    if (!created) {
      throw new Error("Failed to create invite code");
    }
    return toPublicJoinCode(created);
  },
});

export const revoke = authedMutation({
  args: { joinCodeId: v.id("joinCodes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "joinCodeRevoke", { key: ctx.userId, throws: true });
    const codeDoc = await ctx.db.get("joinCodes", args.joinCodeId);
    if (!codeDoc) {
      throw new Error("Invite code not found");
    }

    if (codeDoc.targetKind === "world" && codeDoc.worldId) {
      const scope = worldScope(codeDoc.worldId);
      const canRevoke = await authz.can(ctx, ctx.userId, "invitations:revoke", scope);
      if (!canRevoke) {
        throw new Error("Invite code not found");
      }
    } else if (codeDoc.targetKind === "party" && codeDoc.partyId) {
      const party = await ctx.db.get("parties", codeDoc.partyId);
      if (!party || party.ownerId !== ctx.userId) {
        throw new Error("Invite code not found");
      }
    } else {
      throw new Error("Invite code not found");
    }

    await deleteJoinCodeById(ctx, codeDoc._id);
    return null;
  },
});

export const redeem = authedMutation({
  args: { code: v.string() },
  returns: v.object({
    targetKind: v.union(v.literal("world"), v.literal("party")),
    worldId: v.optional(v.id("worlds")),
    partyId: v.optional(v.id("parties")),
    role: v.string(),
  }),
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "joinCodeRedeemGlobal", { throws: true });
    await rateLimiter.limit(ctx, "joinCodeRedeemShort", { key: ctx.userId, throws: true });
    await rateLimiter.limit(ctx, "joinCodeRedeemHourly", { key: ctx.userId, throws: true });

    const rejectInvalid = async (): Promise<never> => {
      await rateLimiter.limit(ctx, "joinCodeRedeemFailure", { key: ctx.userId, throws: true });
      throw new ConvexError({
        code: "INVALID_JOIN_CODE",
        message: "Invalid or expired invite code",
      });
    };

    const code = normalizeJoinCode(args.code);
    const codeDoc = await ctx.db
      .query("joinCodes")
      .withIndex("by_code", (q) => q.eq("code", code))
      .unique();

    if (!codeDoc) {
      return await rejectInvalid();
    }

    const now = Date.now();
    if (codeDoc.expiresAt <= now) {
      await deleteJoinCodeById(ctx, codeDoc._id);
      return await rejectInvalid();
    }

    if (codeDoc.useCount >= codeDoc.maxUses) {
      await deleteJoinCodeById(ctx, codeDoc._id);
      return await rejectInvalid();
    }

    if (codeDoc.targetKind === "world" && codeDoc.worldId) {
      const worldDoc = await ctx.db.get("worlds", codeDoc.worldId);
      if (!worldDoc) {
        await deleteJoinCodeById(ctx, codeDoc._id);
        return await rejectInvalid();
      }
      if (worldDoc.archivedAt !== undefined) {
        throw new ConvexError({
          code: "WORLD_ARCHIVED",
          message: "This world is archived and cannot be joined",
        });
      }

      if (!isWorldJoinCodeRole(codeDoc.role)) {
        return await rejectInvalid();
      }
      const role: WorldJoinCodeRole = codeDoc.role;

      const scope = worldScope(codeDoc.worldId);
      const existingRoles = await authz.getUserRoles(ctx, ctx.userId, scope);
      const existingRole = pickHighestWorldRole(
        existingRoles.map((entry: { role: string }) => entry.role).filter(isWorldRole),
      );
      if (existingRole) {
        throw new ConvexError({
          code: "ALREADY_MEMBER",
          message: "You are already a member of this world",
        });
      }

      await authz.assignRole(ctx, ctx.userId, role, scope);

      const nextUseCount = codeDoc.useCount + 1;
      if (nextUseCount >= codeDoc.maxUses) {
        await deleteJoinCodeById(ctx, codeDoc._id);
      } else {
        await ctx.db.patch("joinCodes", codeDoc._id, { useCount: nextUseCount });
      }

      return {
        targetKind: "world" as const,
        worldId: codeDoc.worldId,
        role,
      };
    }

    if (codeDoc.targetKind === "party" && codeDoc.partyId) {
      const partyDoc = await ctx.db.get("parties", codeDoc.partyId);
      if (!partyDoc) {
        await deleteJoinCodeById(ctx, codeDoc._id);
        return await rejectInvalid();
      }
      if (partyDoc.archivedAt !== undefined) {
        throw new ConvexError({
          code: "PARTY_ARCHIVED",
          message: "This party is archived and cannot be joined",
        });
      }

      if (!isPartyJoinCodeRole(codeDoc.role)) {
        return await rejectInvalid();
      }
      const role: PartyJoinCodeRole = codeDoc.role;

      const existing = await getPartyMembership(ctx, codeDoc.partyId, ctx.userId);
      if (existing) {
        throw new ConvexError({
          code: "ALREADY_MEMBER",
          message: "You are already a member of this party",
        });
      }

      if (role === "leader") {
        const currentLeader = await getPartyLeader(ctx, codeDoc.partyId);
        if (currentLeader) {
          throw new ConvexError({
            code: "LEADER_EXISTS",
            message: "This party already has a leader",
          });
        }
      }

      await ctx.db.insert("partyMemberships", {
        partyId: codeDoc.partyId,
        userId: ctx.userId,
        role,
        createdAt: Date.now(),
      });

      const nextUseCount = codeDoc.useCount + 1;
      if (nextUseCount >= codeDoc.maxUses) {
        await deleteJoinCodeById(ctx, codeDoc._id);
      } else {
        await ctx.db.patch("joinCodes", codeDoc._id, { useCount: nextUseCount });
      }

      return {
        targetKind: "party" as const,
        partyId: codeDoc.partyId,
        role,
      };
    }

    return await rejectInvalid();
  },
});

export const deleteExpired = internalMutation({
  args: { joinCodeId: v.id("joinCodes") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const codeDoc = await ctx.db.get("joinCodes", args.joinCodeId);
    if (!codeDoc) {
      return null;
    }
    if (codeDoc.expiresAt > Date.now() && codeDoc.useCount < codeDoc.maxUses) {
      return null;
    }
    await ctx.db.delete("joinCodes", codeDoc._id);
    return null;
  },
});
