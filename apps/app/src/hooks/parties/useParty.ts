import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { ONE_HOUR } from "@/lib/queryCache";

export function partyDetailQueryKey(partyId: Id<"parties">) {
  return convexQuery(api.parties.get, { partyId }).queryKey;
}

export function useParty(partyId: Id<"parties">) {
  return useAuthedQuery(api.parties.get, { partyId }, { gcTime: ONE_HOUR });
}
