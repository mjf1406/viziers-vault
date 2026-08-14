import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldsListQueryKey } from "@/hooks/worlds/useWorlds";
import { ownedWorldsQueryKey } from "@/hooks/worlds/useOwnedWorlds";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { isSubscriptionRequiredError } from "@/lib/billing/errors";
import type { WorldPublic } from "@/lib/worlds/worlds";
import { messageFromError } from "@/lib/errors/convexError";
import { randomClientId } from "@/lib/optimistic";

type CreateWorldArgs = {
  name: string;
  description?: string;
  icon?: string;
  imageFileId?: Id<"files">;
};

export function useCreateWorld() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const { t: tBilling } = useTranslation("billing");
  const mutationFn = useConvexMutation(api.worlds.create);
  const queryKey = worldsListQueryKey();
  const ownedKey = ownedWorldsQueryKey();

  return useOptimisticMutation({
    mutationFn: (args: CreateWorldArgs) => mutationFn(args),
    queryKeys: [queryKey, ownedKey],
    applyOptimisticUpdate: (queryClient, args) => {
      const optimisticId = `optimistic:${randomClientId()}` as Id<"worlds">;
      const now = Date.now();
      const optimistic: WorldPublic = {
        _id: optimisticId,
        _creationTime: now,
        ownerId: "optimistic" as Id<"users">,
        name: args.name,
        description: args.description,
        icon: args.icon,
        imageFileId: args.imageFileId,
        updatedAt: now,
        role: "owner",
        _pending: true,
      };
      queryClient.setQueryData<WorldPublic[]>(queryKey, (old) =>
        old ? [optimistic, ...old] : [optimistic],
      );
    },
    onError: (error) => {
      toast.add({
        title: isSubscriptionRequiredError(error)
          ? tBilling("errorCreateRequiresSubscription")
          : messageFromError(error, t("saveFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
