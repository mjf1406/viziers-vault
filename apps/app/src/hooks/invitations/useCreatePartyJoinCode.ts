import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partyJoinCodesListQueryKey } from "@/hooks/invitations/usePartyJoinCodes";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { createOptimisticJoinCodeId, type JoinCodePublic } from "@/lib/invitations/joinCodes";
import type { PartyJoinCodeRole } from "@/lib/permissions/worldPermissions";
import { messageFromError } from "@/lib/errors/convexError";

type CreatePartyJoinCodeArgs = {
  partyId: Id<"parties">;
  role: PartyJoinCodeRole;
  ttlMs: number;
  maxUses: number;
};

export function useCreatePartyJoinCode(listNow: number) {
  const { t } = useTranslation("parties");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.joinCodes.createForParty);

  return useOptimisticMutation({
    mutationFn: (args: CreatePartyJoinCodeArgs) =>
      mutationFn({
        partyId: args.partyId,
        role: args.role,
        ttlMs: args.ttlMs,
        maxUses: args.maxUses,
      }),
    queryKeys: (args) => [partyJoinCodesListQueryKey(args.partyId, listNow)],
    applyOptimisticUpdate: (queryClient, args) => {
      const queryKey = partyJoinCodesListQueryKey(args.partyId, listNow);
      const now = Date.now();
      const optimistic: JoinCodePublic = {
        _id: createOptimisticJoinCodeId(),
        _creationTime: now,
        code: "······",
        targetKind: "party",
        partyId: args.partyId,
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
