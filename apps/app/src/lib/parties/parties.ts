import type { FunctionReturnType } from "convex/server";

import { api } from "../../../convex/_generated/api";

export type PartyDoc = NonNullable<FunctionReturnType<typeof api.parties.get>>;

export type PartyPublic = FunctionReturnType<typeof api.parties.listMine>[number] & {
  _pending?: boolean;
};

export function isPartyArchived(party: Pick<PartyDoc, "archivedAt">): boolean {
  return party.archivedAt !== undefined;
}

export function isPendingParty(party: Pick<PartyPublic, "_pending" | "_id">): boolean {
  return party._pending === true || String(party._id).startsWith("optimistic");
}

export function getPartyUpdatedAt(
  party: Pick<PartyDoc, "updatedAt" | "_creationTime">,
): number | undefined {
  if (typeof party.updatedAt === "number") {
    return party.updatedAt;
  }
  return party._creationTime;
}
