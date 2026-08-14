import { useConvexMutation } from "@convex-dev/react-query";
import type { QueryKey } from "@tanstack/react-query";
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
import { memberListRoleFor } from "@/lib/members/worldMembers";
import { messageFromError } from "@/lib/errors/convexError";

type SetWorldMemberRoleArgs = {
  worldId: Id<"worlds">;
  userId: Id<"users">;
  role: "game_master" | "assistant_game_master";
  fromRole: WorldStaffMember["role"];
};

function sortStaff(members: WorldStaffMember[]): WorldStaffMember[] {
  return [...members].sort((a, b) => {
    const roleRank = (role: WorldStaffMember["role"]) => (role === "owner" ? 0 : 1);
    const byRole = roleRank(a.role) - roleRank(b.role);
    if (byRole !== 0) return byRole;
    const nameA = (a.name ?? a.email ?? a.userId).toLocaleLowerCase();
    const nameB = (b.name ?? b.email ?? b.userId).toLocaleLowerCase();
    return nameA.localeCompare(nameB);
  });
}

function adjustCount(
  counts: WorldMemberCounts,
  listRole: MemberListRole,
  delta: number,
): WorldMemberCounts {
  const current = counts[listRole];
  if (current === null) return counts;
  return { ...counts, [listRole]: Math.max(0, current + delta) };
}

export function useSetWorldMemberRole() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worldMembers.setRole);

  return useOptimisticMutation({
    mutationFn: (args: SetWorldMemberRoleArgs) =>
      mutationFn({
        worldId: args.worldId,
        userId: args.userId,
        role: args.role,
      }),
    queryKeys: (args) => {
      const fromList = memberListRoleFor(args.fromRole);
      const toList = memberListRoleFor(args.role);
      const listKeys: QueryKey[] =
        fromList === toList
          ? [worldStaffByRoleQueryKey(args.worldId, fromList)]
          : [
              worldStaffByRoleQueryKey(args.worldId, fromList),
              worldStaffByRoleQueryKey(args.worldId, toList),
            ];
      return [...listKeys, worldMemberCountsQueryKey(args.worldId)];
    },
    invalidateQueryKeys: (args) => [
      worldStaffByRoleQueryKey(args.worldId, "game_master"),
      worldStaffByRoleQueryKey(args.worldId, "assistant_game_master"),
      worldMemberCountsQueryKey(args.worldId),
      worldsListQueryKey(),
      worldPermissionsQueryKey(args.worldId),
    ],
    applyOptimisticUpdate: (queryClient, args) => {
      const fromList = memberListRoleFor(args.fromRole);
      const toList = memberListRoleFor(args.role);
      const fromKey = worldStaffByRoleQueryKey(args.worldId, fromList);
      const toKey = worldStaffByRoleQueryKey(args.worldId, toList);
      const countsKey = worldMemberCountsQueryKey(args.worldId);

      const fromMembers = queryClient.getQueryData<WorldStaffMember[]>(fromKey);
      const moving = fromMembers?.find((member) => member.userId === args.userId);
      const updatedMember: WorldStaffMember | undefined = moving
        ? { ...moving, role: args.role }
        : undefined;

      if (fromList === toList) {
        queryClient.setQueryData<WorldStaffMember[]>(fromKey, (old) => {
          if (!old) return old;
          return sortStaff(
            old.map((member) =>
              member.userId === args.userId ? { ...member, role: args.role } : member,
            ),
          );
        });
        return;
      }

      queryClient.setQueryData<WorldStaffMember[]>(fromKey, (old) => {
        if (!old) return old;
        return old.filter((member) => member.userId !== args.userId);
      });

      if (updatedMember) {
        queryClient.setQueryData<WorldStaffMember[]>(toKey, (old) => {
          if (!old) return old;
          if (old.some((member) => member.userId === args.userId)) {
            return sortStaff(
              old.map((member) =>
                member.userId === args.userId ? { ...member, role: args.role } : member,
              ),
            );
          }
          return sortStaff([...old, updatedMember]);
        });
      }

      queryClient.setQueryData<WorldMemberCounts>(countsKey, (old) => {
        if (!old) return old;
        return adjustCount(adjustCount(old, fromList, -1), toList, 1);
      });
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("changeRoleFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
