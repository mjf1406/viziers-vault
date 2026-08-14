import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldMemberCountsQueryKey } from "@/hooks/members/useWorldMemberCounts";
import { worldStaffByRoleQueryKey } from "@/hooks/members/useWorldStaffByRole";
import { worldPermissionsQueryKey } from "@/hooks/permissions/useWorldPermissions";
import { worldsListQueryKey } from "@/hooks/worlds/useWorlds";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import type {
  MemberListRole,
  WorldMemberCounts,
  WorldStaffMember,
} from "@/lib/members/worldMembers";
import { messageFromError } from "@/lib/errors/convexError";

type RemoveWorldMemberArgs = {
  worldId: Id<"worlds">;
  userId: Id<"users">;
};

export function useRemoveWorldMember(listRole: MemberListRole) {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worldMembers.remove);

  return useOptimisticMutation({
    mutationFn: (args: RemoveWorldMemberArgs) => mutationFn(args),
    queryKeys: (args) => [
      worldStaffByRoleQueryKey(args.worldId, listRole),
      worldMemberCountsQueryKey(args.worldId),
    ],
    invalidateQueryKeys: (args) => [worldsListQueryKey(), worldPermissionsQueryKey(args.worldId)],
    applyOptimisticUpdate: (queryClient, args) => {
      const queryKey = worldStaffByRoleQueryKey(args.worldId, listRole);
      const countsKey = worldMemberCountsQueryKey(args.worldId);
      queryClient.setQueryData<WorldStaffMember[]>(queryKey, (old) => {
        if (!old) return old;
        return old.filter((member) => member.userId !== args.userId);
      });
      queryClient.setQueryData<WorldMemberCounts>(countsKey, (old) => {
        if (!old) return old;
        const current = old[listRole];
        if (current === null) return old;
        return { ...old, [listRole]: Math.max(0, current - 1) };
      });
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("removeMemberFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
