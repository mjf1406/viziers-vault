import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldDetailQueryKey } from "@/hooks/worlds/useWorld";
import { worldsListQueryKey } from "@/hooks/worlds/useWorlds";
import { ownedWorldsQueryKey } from "@/hooks/worlds/useOwnedWorlds";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import type { WorldPublic } from "@/lib/worlds/worlds";
import { messageFromError } from "@/lib/errors/convexError";
import { removeById } from "@/lib/optimistic";

type WorldDoc = Doc<"worlds">;

type DeleteWorldArgs = {
  worldId: Id<"worlds">;
  confirmation: string;
};

export function useDeleteWorld() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worlds.remove);
  const listKey = worldsListQueryKey();
  const ownedKey = ownedWorldsQueryKey();

  return useOptimisticMutation({
    mutationFn: (args: DeleteWorldArgs) => mutationFn(args),
    queryKeys: (args) => [listKey, ownedKey, worldDetailQueryKey(args.worldId)],
    applyOptimisticUpdate: (queryClient, args) => {
      const detailKey = worldDetailQueryKey(args.worldId);
      queryClient.setQueryData<WorldPublic[]>(listKey, (old) =>
        old ? removeById(old, args.worldId) : old,
      );
      queryClient.setQueryData<WorldDoc[]>(ownedKey, (old) =>
        old ? removeById(old, args.worldId) : old,
      );
      queryClient.setQueryData<WorldDoc | null>(detailKey, null);
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("saveFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
