import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldDetailQueryKey } from "@/hooks/worlds/useWorld";
import { worldsListQueryKey } from "@/hooks/worlds/useWorlds";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import type { WorldPublic } from "@/lib/worlds/worlds";
import { messageFromError } from "@/lib/errors/convexError";
import { patchDoc } from "@/lib/optimistic";

type WorldDoc = Doc<"worlds">;

type SetWorldArchivedArgs = {
  worldId: Id<"worlds">;
  archived: boolean;
};

export function useSetWorldArchived() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worlds.setArchived);
  const listKey = worldsListQueryKey();

  return useOptimisticMutation({
    mutationFn: (args: SetWorldArchivedArgs) => mutationFn(args),
    queryKeys: (args) => [listKey, worldDetailQueryKey(args.worldId)],
    applyOptimisticUpdate: (queryClient, args) => {
      const detailKey = worldDetailQueryKey(args.worldId);
      const now = Date.now();
      const patch = {
        archivedAt: args.archived ? now : undefined,
        updatedAt: now,
      };
      queryClient.setQueryData<WorldPublic[]>(listKey, (old) => {
        if (!old) return old;
        return old.map((world) => (world._id === args.worldId ? { ...world, ...patch } : world));
      });
      queryClient.setQueryData<WorldDoc | null>(detailKey, (old) =>
        patchDoc(old ?? null, (doc) => ({ ...doc, ...patch })),
      );
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("saveFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
