import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { FIVE_MINUTES } from "@/lib/queryCache";

export function eligibleWorldOwnersQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.worlds.eligibleOwners, { worldId }).queryKey;
}

export function useEligibleWorldOwners(worldId: Id<"worlds">) {
  return useAuthedQuery(api.worlds.eligibleOwners, { worldId }, { gcTime: FIVE_MINUTES });
}
