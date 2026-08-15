import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ONE_HOUR } from "@/lib/queryCache";

export function partyWorldGrantCountQueryKey(partyId: Id<"parties">) {
  return convexQuery(api.worldPartyGrants.countForParty, { partyId }).queryKey;
}

export function usePartyWorldGrantCount(partyId: Id<"parties"> | "skip") {
  return useAuthedQuery(
    api.worldPartyGrants.countForParty,
    partyId === "skip" ? "skip" : { partyId },
    { gcTime: ONE_HOUR },
  );
}
