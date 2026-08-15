import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { ONE_HOUR } from "@/lib/queryCache";
import { api } from "../../../convex/_generated/api";

export function partyMemberCountQueryKey(partyId: Id<"parties">) {
  return convexQuery(api.partyMembers.count, { partyId }).queryKey;
}

export function usePartyMemberCount(partyId: Id<"parties"> | "skip") {
  return useAuthedQuery(api.partyMembers.count, partyId === "skip" ? "skip" : { partyId }, {
    gcTime: ONE_HOUR,
  });
}
