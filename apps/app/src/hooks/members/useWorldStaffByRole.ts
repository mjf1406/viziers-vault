import { convexQuery } from "@convex-dev/react-query";

import type { Id } from "../../../convex/_generated/dataModel";
import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import type { MemberListRole } from "@/lib/permissions/worldPermissions";
import { ONE_HOUR } from "@/lib/queryCache";
import { api } from "../../../convex/_generated/api";

export function worldStaffByRoleQueryKey(worldId: Id<"worlds">, role: MemberListRole) {
  return convexQuery(api.worldMembers.listStaffByRole, { worldId, role }).queryKey;
}

export function useWorldStaffByRole(worldId: Id<"worlds">, role: MemberListRole) {
  return useAuthedQuery(api.worldMembers.listStaffByRole, { worldId, role }, { gcTime: ONE_HOUR });
}
