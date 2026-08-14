import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { ONE_HOUR } from "@/lib/queryCache";

export function worldDetailQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.worlds.get, { worldId }).queryKey;
}

export function useWorld(worldId: Id<"worlds">) {
  return useAuthedQuery(api.worlds.get, { worldId }, { gcTime: ONE_HOUR });
}

export function useWorldByLegacyClassId(classId: Id<"classes">) {
  return useAuthedQuery(api.worlds.getByLegacyClassId, { classId }, { gcTime: ONE_HOUR });
}
