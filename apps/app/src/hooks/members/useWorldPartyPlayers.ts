import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { ONE_HOUR } from "@/lib/queryCache";
import { api } from "../../../convex/_generated/api";

export function worldPartyPlayersQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.worldMembers.listPartyPlayers, { worldId }).queryKey;
}

export function useWorldPartyPlayers(worldId: Id<"worlds">) {
  return useAuthedQuery(api.worldMembers.listPartyPlayers, { worldId }, { gcTime: ONE_HOUR });
}
