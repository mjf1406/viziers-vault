import { convexQuery } from "@convex-dev/react-query";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { ONE_HOUR } from "@/lib/queryCache";

export function worldPermissionsQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.permissions.forWorld, { worldId }).queryKey;
}

export function useWorldPermissions(worldId: Id<"worlds">) {
  return useAuthedQuery(api.permissions.forWorld, { worldId }, { gcTime: ONE_HOUR });
}
