import { keepPreviousData } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { FIVE_MINUTES } from "@/lib/queryCache";

export function worldJoinCodesListQueryKey(worldId: Id<"worlds">, now: number) {
  return convexQuery(api.joinCodes.listForWorld, { worldId, now }).queryKey;
}

export function useWorldJoinCodes(worldId: Id<"worlds">, now: number) {
  return useAuthedQuery(
    api.joinCodes.listForWorld,
    { worldId, now },
    {
      gcTime: FIVE_MINUTES,
      placeholderData: keepPreviousData,
    },
  );
}
