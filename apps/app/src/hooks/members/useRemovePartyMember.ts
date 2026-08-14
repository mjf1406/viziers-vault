import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partyMembersQueryKey } from "@/hooks/members/usePartyMembers";
import { partiesListQueryKey } from "@/hooks/parties/useParties";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { messageFromError } from "@/lib/errors/convexError";

type PartyMember = {
  userId: Id<"users">;
  name?: string;
  image?: string;
  email?: string;
  role: "leader" | "member";
};

type RemovePartyMemberArgs = {
  partyId: Id<"parties">;
  userId: Id<"users">;
};

export function useRemovePartyMember() {
  const { t } = useTranslation("parties");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.partyMembers.remove);

  return useOptimisticMutation({
    mutationFn: (args: RemovePartyMemberArgs) => mutationFn(args),
    queryKeys: (args) => [partyMembersQueryKey(args.partyId)],
    invalidateQueryKeys: () => [partiesListQueryKey()],
    applyOptimisticUpdate: (queryClient, args) => {
      const queryKey = partyMembersQueryKey(args.partyId);
      queryClient.setQueryData<PartyMember[]>(queryKey, (old) => {
        if (!old) return old;
        return old.filter((member) => member.userId !== args.userId);
      });
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("removeMemberFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
