import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldMemberPermissionsQueryKey } from "@/hooks/permissions/useWorldMemberPermissions";
import { worldPermissionsQueryKey } from "@/hooks/permissions/useWorldPermissions";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { messageFromError } from "@/lib/errors/convexError";
import { effectivePermissionEnabled } from "@/lib/permissions/worldPermissions";

type WorldMemberPermissionsData = {
  userId: Id<"users">;
  role: "game_master" | "assistant_game_master";
  permissions: Array<{
    permission: string;
    roleDefault: boolean;
    override: "allow" | "deny" | null;
    effective: boolean;
  }>;
};

type SetWorldMemberPermissionArgs = {
  worldId: Id<"worlds">;
  userId: Id<"users">;
  permission: string;
  enabled: boolean;
};

export function useSetWorldMemberPermission() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worldPermissions.setMemberPermission);

  return useOptimisticMutation({
    mutationFn: (args: SetWorldMemberPermissionArgs) =>
      mutationFn({
        worldId: args.worldId,
        userId: args.userId,
        permission: args.permission,
        enabled: args.enabled,
      }),
    queryKeys: (args) => [worldMemberPermissionsQueryKey(args.worldId, args.userId)],
    invalidateQueryKeys: (args) => [
      worldMemberPermissionsQueryKey(args.worldId, args.userId),
      worldPermissionsQueryKey(args.worldId),
    ],
    applyOptimisticUpdate: (queryClient, args) => {
      const key = worldMemberPermissionsQueryKey(args.worldId, args.userId);
      queryClient.setQueryData<WorldMemberPermissionsData>(key, (old) => {
        if (!old) return old;
        return {
          ...old,
          permissions: old.permissions.map((entry) => {
            if (entry.permission !== args.permission) return entry;
            let override: "allow" | "deny" | null = null;
            if (args.enabled && !entry.roleDefault) override = "allow";
            if (!args.enabled && entry.roleDefault) override = "deny";
            return {
              ...entry,
              override,
              effective: effectivePermissionEnabled(entry.roleDefault, override),
            };
          }),
        };
      });
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("permissionsUpdateFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
