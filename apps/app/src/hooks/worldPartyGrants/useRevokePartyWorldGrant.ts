import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partyWorldGrantCountQueryKey } from "@/hooks/worldPartyGrants/usePartyWorldGrantCount";
import { worldPartyGrantsForPartyQueryKey } from "@/hooks/worldPartyGrants/usePartyWorldGrants";
import { worldPartyGrantsQueryKey } from "@/hooks/worldPartyGrants/useWorldPartyGrants";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { messageFromError } from "@/lib/errors/convexError";

type WorldPartyGrantRow = FunctionReturnType<typeof api.worldPartyGrants.listForWorld>[number];
type PartyWorldGrantRow = FunctionReturnType<typeof api.worldPartyGrants.listForParty>[number];

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
    queryKeys: (args) => [
      worldPartyGrantsQueryKey(args.worldId),
      worldPartyGrantsForPartyQueryKey(args.partyId),
      partyWorldGrantCountQueryKey(args.partyId),
    ],
    applyOptimisticUpdate: (queryClient, args) => {
      queryClient.setQueryData<WorldPartyGrantRow[]>(
        worldPartyGrantsQueryKey(args.worldId),
        (old) => (old ? old.filter((grant) => grant.partyId !== args.partyId) : old),
      );
      queryClient.setQueryData<PartyWorldGrantRow[]>(
        worldPartyGrantsForPartyQueryKey(args.partyId),
        (old) => (old ? old.filter((grant) => grant.worldId !== args.worldId) : old),
      );
      queryClient.setQueryData<number>(partyWorldGrantCountQueryKey(args.partyId), (old) => {
        if (old === undefined) return old;
        return Math.max(0, old - 1);
      });
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("revokePartyGrantFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
