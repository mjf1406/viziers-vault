import { keepPreviousData } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { FIVE_MINUTES } from "@/lib/queryCache";

export function partyJoinCodesListQueryKey(partyId: Id<"parties">, now: number) {
  return convexQuery(api.joinCodes.listForParty, { partyId, now }).queryKey;
}

export function usePartyJoinCodes(partyId: Id<"parties">, now: number) {
  return useAuthedQuery(
    api.joinCodes.listForParty,
    { partyId, now },
    {
      gcTime: FIVE_MINUTES,
      placeholderData: keepPreviousData,
    },
  );
}
