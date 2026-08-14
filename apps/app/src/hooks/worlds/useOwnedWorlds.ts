import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { ONE_HOUR } from "@/lib/queryCache";

export function ownedWorldsQueryKey() {
  return convexQuery(api.worlds.listOwned, {}).queryKey;
}

export function useOwnedWorlds() {
  return useAuthedQuery(api.worlds.listOwned, {}, { gcTime: ONE_HOUR });
}
