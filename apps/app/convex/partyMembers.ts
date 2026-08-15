import { v } from "convex/values";

import type { Id } from "./_generated/dataModel.js";
import { getPartyLeader, listPartyMemberships } from "./lib/partyMembership.js";
import { partyMutation, partyQuery } from "./lib/customFunctions.js";
import { rateLimiter } from "./lib/rateLimiter.js";
import { resolveUserImageUrl } from "./lib/userImage.js";
import { isSelfHosted } from "./lib/selfHosted.js";

const partyMemberValidator = v.object({
  userId: v.id("users"),
  name: v.optional(v.string()),
  image: v.optional(v.string()),
  email: v.optional(v.string()),
  role: v.union(v.literal("leader"), v.literal("member")),
});

export const list = partyQuery({
  args: {},
  returns: v.array(partyMemberValidator),
  handler: async (ctx) => {
    const memberships = await listPartyMemberships(ctx, ctx.partyDoc._id);
    const members: Array<{
      userId: Id<"users">;
      name?: string;
      image?: string;
      email?: string;
      role: "leader" | "member";
    }> = [];

    for (const membership of memberships) {
      const user = await ctx.db.get("users", membership.userId);
      if (!user) continue;
      members.push({
        userId: user._id,
        name: user.name,
        image: await resolveUserImageUrl(ctx, user),
        email: isSelfHosted() ? user.email : undefined,
        role: membership.role,
      });
    }

    members.sort((a, b) => {
      const roleRank = (role: "leader" | "member") => (role === "leader" ? 0 : 1);
      const byRole = roleRank(a.role) - roleRank(b.role);
      if (byRole !== 0) return byRole;
      const nameA = (a.name ?? a.email ?? a.userId).toLocaleLowerCase();
      const nameB = (b.name ?? b.email ?? b.userId).toLocaleLowerCase();
      return nameA.localeCompare(nameB);
    });

    return members;
  },
});

export const count = partyQuery({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const memberships = await listPartyMemberships(ctx, ctx.partyDoc._id);
    return memberships.length;
  },
});

export const remove = partyMutation({
  args: { userId: v.id("users") },
  returns: v.null(),
  handler: async (ctx, args) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyMemberRemove", { key: ctx.userId, throws: true });
    const membership = await ctx.db
      .query("partyMemberships")
      .withIndex("by_party_and_user", (q) =>
        q.eq("partyId", ctx.partyDoc._id).eq("userId", args.userId),
      )
      .unique();
    if (!membership) {
      throw new Error("Person is not in this party");
    }
    await ctx.db.delete("partyMemberships", membership._id);
    return null;
  },
});

export const setLeader = partyMutation({
  args: { userId: v.id("users") },
  returns: v.null(),
  handler: async (ctx, args) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyMemberSetRole", { key: ctx.userId, throws: true });

    const membership = await ctx.db
      .query("partyMemberships")
      .withIndex("by_party_and_user", (q) =>
        q.eq("partyId", ctx.partyDoc._id).eq("userId", args.userId),
      )
      .unique();
    if (!membership) {
      throw new Error("Person must be a party member before becoming leader");
    }

    const currentLeader = await getPartyLeader(ctx, ctx.partyDoc._id);
    if (currentLeader && currentLeader.userId !== args.userId) {
      await ctx.db.patch("partyMemberships", currentLeader._id, { role: "member" });
    }
    if (membership.role !== "leader") {
      await ctx.db.patch("partyMemberships", membership._id, { role: "leader" });
    }
    return null;
  },
});

export const clearLeader = partyMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    ctx.requireOwner();
    await rateLimiter.limit(ctx, "partyMemberSetRole", { key: ctx.userId, throws: true });
    const leader = await getPartyLeader(ctx, ctx.partyDoc._id);
    if (leader) {
      await ctx.db.patch("partyMemberships", leader._id, { role: "member" });
    }
    return null;
  },
});
