import type { Doc, Id } from "../_generated/dataModel.js";
import type { MutationCtx, QueryCtx } from "../_generated/server.js";

export type PartyMembershipRole = "leader" | "member";

export async function getPartyMembership(
  ctx: QueryCtx | MutationCtx,
  partyId: Id<"parties">,
  userId: Id<"users">,
): Promise<Doc<"partyMemberships"> | null> {
  return await ctx.db
    .query("partyMemberships")
    .withIndex("by_party_and_user", (q) => q.eq("partyId", partyId).eq("userId", userId))
    .unique();
}

export async function listPartyMemberships(
  ctx: QueryCtx | MutationCtx,
  partyId: Id<"parties">,
): Promise<Array<Doc<"partyMemberships">>> {
  // eslint-disable-next-line @convex-dev/no-collect-in-query -- party roster bounded
  return await ctx.db
    .query("partyMemberships")
    .withIndex("by_party", (q) => q.eq("partyId", partyId))
    .collect();
}

export async function getPartyLeader(
  ctx: QueryCtx | MutationCtx,
  partyId: Id<"parties">,
): Promise<Doc<"partyMemberships"> | null> {
  const leaders = await ctx.db
    .query("partyMemberships")
    .withIndex("by_party_and_role", (q) => q.eq("partyId", partyId).eq("role", "leader"))
    .take(2);
  if (leaders.length > 1) {
    throw new Error("Party has multiple leaders");
  }
  return leaders[0] ?? null;
}

export async function isPartyOwner(
  ctx: QueryCtx | MutationCtx,
  partyId: Id<"parties">,
  userId: Id<"users">,
): Promise<boolean> {
  const party = await ctx.db.get("parties", partyId);
  return party?.ownerId === userId;
}

export async function canReadParty(
  ctx: QueryCtx | MutationCtx,
  partyId: Id<"parties">,
  userId: Id<"users">,
): Promise<boolean> {
  if (await isPartyOwner(ctx, partyId, userId)) {
    return true;
  }
  const membership = await getPartyMembership(ctx, partyId, userId);
  return membership !== null;
}
