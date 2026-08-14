import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partyDetailQueryKey } from "@/hooks/parties/useParty";
import { partiesListQueryKey } from "@/hooks/parties/useParties";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import type { PartyPublic } from "@/lib/parties/parties";
import { messageFromError } from "@/lib/errors/convexError";
import { patchDoc } from "@/lib/optimistic";

type PartyDoc = Doc<"parties">;

type UpdatePartyArgs = {
  partyId: Id<"parties">;
  name: string;
  description?: string;
  icon?: string;
  imageFileId?: Id<"files">;
};

export function useUpdateParty() {
  const { t } = useTranslation("parties");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.parties.update);
  const listKey = partiesListQueryKey();

  return useOptimisticMutation({
    mutationFn: (args: UpdatePartyArgs) => mutationFn(args),
    queryKeys: (args) => [listKey, partyDetailQueryKey(args.partyId)],
    applyOptimisticUpdate: (queryClient, args) => {
      const detailKey = partyDetailQueryKey(args.partyId);
      const now = Date.now();
      const patch = {
        name: args.name,
        description: args.description,
        icon: args.icon,
        imageFileId: args.imageFileId,
        updatedAt: now,
      };
      queryClient.setQueryData<PartyPublic[]>(listKey, (old) => {
        if (!old) return old;
        return old.map((party) => (party._id === args.partyId ? { ...party, ...patch } : party));
      });
      queryClient.setQueryData<PartyDoc | null>(detailKey, (old) =>
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
