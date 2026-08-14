import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { ONE_HOUR } from "@/lib/queryCache";

export function ownedPartiesQueryKey() {
  return convexQuery(api.parties.listOwned, {}).queryKey;
}

export function useOwnedParties() {
  return useAuthedQuery(api.parties.listOwned, {}, { gcTime: ONE_HOUR });
}
