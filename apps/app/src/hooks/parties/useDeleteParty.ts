import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partyDetailQueryKey } from "@/hooks/parties/useParty";
import { partiesListQueryKey } from "@/hooks/parties/useParties";
import { ownedPartiesQueryKey } from "@/hooks/parties/useOwnedParties";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import type { PartyPublic } from "@/lib/parties/parties";
import { messageFromError } from "@/lib/errors/convexError";
import { removeById } from "@/lib/optimistic";

type PartyDoc = Doc<"parties">;

type DeletePartyArgs = {
  partyId: Id<"parties">;
  confirmation: string;
};

export function useDeleteParty() {
  const { t } = useTranslation("parties");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.parties.remove);
  const listKey = partiesListQueryKey();
  const ownedKey = ownedPartiesQueryKey();

  return useOptimisticMutation({
    mutationFn: (args: DeletePartyArgs) => mutationFn(args),
    queryKeys: (args) => [listKey, ownedKey, partyDetailQueryKey(args.partyId)],
    applyOptimisticUpdate: (queryClient, args) => {
      const detailKey = partyDetailQueryKey(args.partyId);
      queryClient.setQueryData<PartyPublic[]>(listKey, (old) =>
        old ? removeById(old, args.partyId) : old,
      );
      queryClient.setQueryData<PartyDoc[]>(ownedKey, (old) =>
        old ? removeById(old, args.partyId) : old,
      );
      queryClient.setQueryData<PartyDoc | null>(detailKey, null);
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("saveFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
