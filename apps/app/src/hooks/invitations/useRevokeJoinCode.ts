import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partyJoinCodesListQueryKey } from "@/hooks/invitations/usePartyJoinCodes";
import { worldJoinCodesListQueryKey } from "@/hooks/invitations/useWorldJoinCodes";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import type { JoinCodePublic } from "@/lib/invitations/joinCodes";
import { messageFromError } from "@/lib/errors/convexError";
import { removeById } from "@/lib/optimistic";

type RevokeJoinCodeListKey =
  | { kind: "world"; worldId: Id<"worlds">; now: number }
  | { kind: "party"; partyId: Id<"parties">; now: number };

type RevokeJoinCodeArgs = {
  joinCodeId: Id<"joinCodes">;
  listKey: RevokeJoinCodeListKey;
};

function queryKeyForList(listKey: RevokeJoinCodeListKey) {
  switch (listKey.kind) {
    case "world":
      return worldJoinCodesListQueryKey(listKey.worldId, listKey.now);
    case "party":
      return partyJoinCodesListQueryKey(listKey.partyId, listKey.now);
  }
}

export function useRevokeJoinCode(namespace: "worlds" | "parties" = "worlds") {
  const { t } = useTranslation(namespace);
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.joinCodes.revoke);

  return useOptimisticMutation({
    mutationFn: (args: RevokeJoinCodeArgs) => mutationFn({ joinCodeId: args.joinCodeId }),
    queryKeys: (args) => [queryKeyForList(args.listKey)],
    applyOptimisticUpdate: (queryClient, args) => {
      const queryKey = queryKeyForList(args.listKey);
      queryClient.setQueryData<JoinCodePublic[]>(queryKey, (old) =>
        old ? removeById(old, args.joinCodeId) : old,
      );
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("revokeInviteFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}

export type { RevokeJoinCodeListKey };
