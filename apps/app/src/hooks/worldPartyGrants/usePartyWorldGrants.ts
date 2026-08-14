import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ONE_HOUR } from "@/lib/queryCache";

export function worldPartyGrantsForPartyQueryKey(partyId: Id<"parties">) {
  return convexQuery(api.worldPartyGrants.listForParty, { partyId }).queryKey;
}

export function usePartyWorldGrants(partyId: Id<"parties">) {
  return useAuthedQuery(api.worldPartyGrants.listForParty, { partyId }, { gcTime: ONE_HOUR });
}
