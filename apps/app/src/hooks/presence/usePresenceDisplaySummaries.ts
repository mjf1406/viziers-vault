import { useMemo } from "react";
import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { normalizeOnlineUserIds } from "@/lib/presence/presence";
import { ONE_HOUR } from "@/lib/queryCache";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export function presenceDisplaySummariesQueryKey(
  worldId: Id<"worlds">,
  onlineUserIds: readonly string[],
) {
  return convexQuery(api.presence.displaySummaries, {
    worldId,
    userIds: [...onlineUserIds],
  }).queryKey;
}

/**
 * Cached display fields for online users in a world room.
 *
 * gcTime: ONE_HOUR — stable member avatars/names; Convex keeps mounted data live.
 */
export function usePresenceDisplaySummaries(
  worldId: Id<"worlds">,
  onlineUserIds: ReadonlySet<string> | undefined,
) {
  const normalizedUserIds = useMemo(() => normalizeOnlineUserIds(onlineUserIds), [onlineUserIds]);

  return useAuthedQuery(
    api.presence.displaySummaries,
    normalizedUserIds.length > 0 ? { worldId, userIds: normalizedUserIds } : "skip",
    { gcTime: ONE_HOUR },
  );
}
