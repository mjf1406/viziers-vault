import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { ONE_HOUR } from "@/lib/queryCache";
import { api } from "../../../convex/_generated/api";

export function partyMembersQueryKey(partyId: Id<"parties">) {
  return convexQuery(api.partyMembers.list, { partyId }).queryKey;
}

export function usePartyMembers(partyId: Id<"parties">) {
  return useAuthedQuery(api.partyMembers.list, { partyId }, { gcTime: ONE_HOUR });
}
