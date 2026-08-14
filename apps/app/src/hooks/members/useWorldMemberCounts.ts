import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { ONE_HOUR } from "@/lib/queryCache";
import { api } from "../../../convex/_generated/api";

export function worldMemberCountsQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.worldMembers.countsByRole, { worldId }).queryKey;
}

export function useWorldMemberCounts(worldId: Id<"worlds">) {
  return useAuthedQuery(api.worldMembers.countsByRole, { worldId }, { gcTime: ONE_HOUR });
}
