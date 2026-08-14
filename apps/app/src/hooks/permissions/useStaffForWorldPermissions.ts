import { convexQuery } from "@convex-dev/react-query";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { ONE_HOUR } from "@/lib/queryCache";

export function staffForWorldPermissionsQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.worldPermissions.listStaffForPermissions, { worldId }).queryKey;
}

/** gcTime: ONE_HOUR — same as member lists; Convex keeps mounted data live. */
export function useStaffForWorldPermissions(worldId: Id<"worlds">) {
  return useAuthedQuery(
    api.worldPermissions.listStaffForPermissions,
    { worldId },
    { gcTime: ONE_HOUR },
  );
}
