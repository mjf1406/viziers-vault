import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldPartyGrantsQueryKey } from "@/hooks/worldPartyGrants/useWorldPartyGrants";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { messageFromError } from "@/lib/errors/convexError";

type WorldPartyGrantRow = FunctionReturnType<typeof api.worldPartyGrants.listForWorld>[number];

type RevokePartyGrantArgs = {
  worldId: Id<"worlds">;
  partyId: Id<"parties">;
};

export function useRevokePartyWorldGrant() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worldPartyGrants.revoke);

  return useOptimisticMutation({
    mutationFn: (args: RevokePartyGrantArgs) => mutationFn(args),
    queryKeys: (args) => [worldPartyGrantsQueryKey(args.worldId)],
    applyOptimisticUpdate: (queryClient, args) => {
      const key = worldPartyGrantsQueryKey(args.worldId);
      queryClient.setQueryData<WorldPartyGrantRow[]>(key, (old) =>
        old ? old.filter((grant) => grant.partyId !== args.partyId) : old,
      );
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("revokePartyGrantFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
