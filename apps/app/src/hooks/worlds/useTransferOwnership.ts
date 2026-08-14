import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldDetailQueryKey } from "@/hooks/worlds/useWorld";
import { worldsListQueryKey } from "@/hooks/worlds/useWorlds";
import { eligibleWorldOwnersQueryKey } from "@/hooks/worlds/useEligibleOwners";
import { ownedWorldsQueryKey } from "@/hooks/worlds/useOwnedWorlds";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import type { WorldPublic } from "@/lib/worlds/worlds";
import { messageFromError } from "@/lib/errors/convexError";
import { removeById } from "@/lib/optimistic";

type WorldDoc = Doc<"worlds">;

type TransferWorldOwnershipArgs = {
  worldId: Id<"worlds">;
  toUserId: Id<"users">;
};

export function useTransferWorldOwnership() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worlds.transferOwnership);
  const listKey = worldsListQueryKey();
  const ownedKey = ownedWorldsQueryKey();

  return useOptimisticMutation({
    mutationFn: (args: TransferWorldOwnershipArgs) => mutationFn(args),
    queryKeys: (args) => [
      listKey,
      ownedKey,
      worldDetailQueryKey(args.worldId),
      eligibleWorldOwnersQueryKey(args.worldId),
    ],
    applyOptimisticUpdate: (queryClient, args) => {
      const detailKey = worldDetailQueryKey(args.worldId);
      queryClient.setQueryData<WorldPublic[]>(listKey, (old) => {
        if (!old) return old;
        return old.map((entry) =>
          entry._id === args.worldId
            ? { ...entry, ownerId: args.toUserId, role: "game_master" as const }
            : entry,
        );
      });
      queryClient.setQueryData<WorldDoc[]>(ownedKey, (old) =>
        old ? removeById(old, args.worldId) : old,
      );
      queryClient.setQueryData<WorldDoc | null>(detailKey, (old) =>
        old ? { ...old, ownerId: args.toUserId } : old,
      );
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("transferFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
