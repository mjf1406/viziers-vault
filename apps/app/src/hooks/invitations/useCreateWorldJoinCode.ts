import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldJoinCodesListQueryKey } from "@/hooks/invitations/useWorldJoinCodes";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { createOptimisticJoinCodeId, type JoinCodePublic } from "@/lib/invitations/joinCodes";
import type { WorldJoinCodeRole } from "@/lib/permissions/worldPermissions";
import { messageFromError } from "@/lib/errors/convexError";

type CreateWorldJoinCodeArgs = {
  worldId: Id<"worlds">;
  role: WorldJoinCodeRole;
  ttlMs: number;
  maxUses: number;
};

export function useCreateWorldJoinCode(listNow: number) {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.joinCodes.createForWorld);

  return useOptimisticMutation({
    mutationFn: (args: CreateWorldJoinCodeArgs) =>
      mutationFn({
        worldId: args.worldId,
        role: args.role,
        ttlMs: args.ttlMs,
        maxUses: args.maxUses,
      }),
    queryKeys: (args) => [worldJoinCodesListQueryKey(args.worldId, listNow)],
    applyOptimisticUpdate: (queryClient, args) => {
      const queryKey = worldJoinCodesListQueryKey(args.worldId, listNow);
      const now = Date.now();
      const optimistic: JoinCodePublic = {
        _id: createOptimisticJoinCodeId(),
        _creationTime: now,
        code: "······",
        targetKind: "world",
        worldId: args.worldId,
        createdBy: "optimistic" as Id<"users">,
        role: args.role,
        expiresAt: now + args.ttlMs,
        maxUses: args.maxUses,
        useCount: 0,
        _pending: true,
      };
      queryClient.setQueryData<JoinCodePublic[]>(queryKey, (old) =>
        old ? [optimistic, ...old] : [optimistic],
      );
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("createInviteFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
