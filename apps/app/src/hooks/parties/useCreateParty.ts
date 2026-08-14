import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partiesListQueryKey } from "@/hooks/parties/useParties";
import { ownedPartiesQueryKey } from "@/hooks/parties/useOwnedParties";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { isSubscriptionRequiredError } from "@/lib/billing/errors";
import type { PartyPublic } from "@/lib/parties/parties";
import { messageFromError } from "@/lib/errors/convexError";
import { randomClientId } from "@/lib/optimistic";

type CreatePartyArgs = {
  name: string;
  description?: string;
  icon?: string;
  imageFileId?: Id<"files">;
};

export function useCreateParty() {
  const { t } = useTranslation("parties");
  const { t: tCommon } = useTranslation("common");
  const { t: tBilling } = useTranslation("billing");
  const mutationFn = useConvexMutation(api.parties.create);
  const queryKey = partiesListQueryKey();
  const ownedKey = ownedPartiesQueryKey();

  return useOptimisticMutation({
    mutationFn: (args: CreatePartyArgs) => mutationFn(args),
    queryKeys: [queryKey, ownedKey],
    applyOptimisticUpdate: (queryClient, args) => {
      const optimisticId = `optimistic:${randomClientId()}` as Id<"parties">;
      const now = Date.now();
      const optimistic: PartyPublic = {
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
      queryClient.setQueryData<PartyPublic[]>(queryKey, (old) =>
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
