import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partiesListQueryKey } from "@/hooks/parties/useParties";
import { ownedPartiesQueryKey } from "@/hooks/parties/useOwnedParties";
import {
  grantablePartiesForWorldQueryKey,
  worldPartyGrantsQueryKey,
} from "@/hooks/worldPartyGrants/useWorldPartyGrants";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { isSubscriptionRequiredError } from "@/lib/billing/errors";
import { messageFromError } from "@/lib/errors/convexError";
import { randomClientId } from "@/lib/optimistic";
import type { PartyPublic } from "@/lib/parties/parties";

type WorldPartyGrantRow = FunctionReturnType<typeof api.worldPartyGrants.listForWorld>[number];

type CreatePartyAndGrantArgs = {
  worldId: Id<"worlds">;
  name: string;
  description?: string;
  icon?: string;
  imageFileId?: Id<"files">;
};

export function useCreatePartyAndGrantWorldAccess() {
  const { t } = useTranslation("parties");
  const { t: tBilling } = useTranslation("billing");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worldPartyGrants.createPartyAndGrant);

  return useOptimisticMutation({
    mutationFn: (args: CreatePartyAndGrantArgs) => mutationFn(args),
    queryKeys: (args) => [
      worldPartyGrantsQueryKey(args.worldId),
      grantablePartiesForWorldQueryKey(args.worldId),
      partiesListQueryKey(),
      ownedPartiesQueryKey(),
    ],
    applyOptimisticUpdate: (queryClient, args) => {
      const now = Date.now();
      const optimisticPartyId = `optimistic:${randomClientId()}` as Id<"parties">;
      const optimistic: PartyPublic = {
        _id: optimisticPartyId,
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
      queryClient.setQueryData<PartyPublic[]>(partiesListQueryKey(), (old) =>
        old ? [optimistic, ...old] : [optimistic],
      );

      const grantsKey = worldPartyGrantsQueryKey(args.worldId);
      const optimisticGrant: WorldPartyGrantRow = {
        _id: `optimistic:${randomClientId()}` as Id<"worldPartyGrants">,
        worldId: args.worldId,
        partyId: optimisticPartyId,
        partyName: args.name,
        grantedBy: "optimistic" as Id<"users">,
        createdAt: now,
      };
      queryClient.setQueryData<WorldPartyGrantRow[]>(grantsKey, (old) =>
        old ? [optimisticGrant, ...old] : [optimisticGrant],
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
