import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { ONE_HOUR } from "@/lib/queryCache";

export function worldPartyGrantsQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.worldPartyGrants.listForWorld, { worldId }).queryKey;
}

export function useWorldPartyGrants(worldId: Id<"worlds">) {
  return useAuthedQuery(api.worldPartyGrants.listForWorld, { worldId }, { gcTime: ONE_HOUR });
}

export function grantablePartiesForWorldQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.worldPartyGrants.listGrantableParties, { worldId }).queryKey;
}

export function useGrantablePartiesForWorld(worldId: Id<"worlds">) {
  return useAuthedQuery(
    api.worldPartyGrants.listGrantableParties,
    { worldId },
    { gcTime: ONE_HOUR },
  );
}
