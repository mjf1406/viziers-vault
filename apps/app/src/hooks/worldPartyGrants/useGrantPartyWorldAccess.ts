import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { partyWorldGrantCountQueryKey } from "@/hooks/worldPartyGrants/usePartyWorldGrantCount";
import { worldPartyGrantsForPartyQueryKey } from "@/hooks/worldPartyGrants/usePartyWorldGrants";
import {
  grantablePartiesForWorldQueryKey,
  worldPartyGrantsQueryKey,
} from "@/hooks/worldPartyGrants/useWorldPartyGrants";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { messageFromError } from "@/lib/errors/convexError";
import { randomClientId } from "@/lib/optimistic";

type WorldPartyGrantRow = FunctionReturnType<typeof api.worldPartyGrants.listForWorld>[number];

type GrantPartyAccessArgs = {
  worldId: Id<"worlds">;
  parties: Array<{ _id: Id<"parties">; name: string }>;
};

export function useGrantPartyWorldAccess() {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.worldPartyGrants.grant);

  return useOptimisticMutation({
    mutationFn: (args: GrantPartyAccessArgs) =>
      mutationFn({
        worldId: args.worldId,
        partyIds: args.parties.map((party) => party._id),
      }),
    queryKeys: (args) => [
      worldPartyGrantsQueryKey(args.worldId),
      grantablePartiesForWorldQueryKey(args.worldId),
      ...args.parties.flatMap((party) => [
        worldPartyGrantsForPartyQueryKey(party._id),
        partyWorldGrantCountQueryKey(party._id),
      ]),
    ],
    applyOptimisticUpdate: (queryClient, args) => {
      const key = worldPartyGrantsQueryKey(args.worldId);
      const now = Date.now();
      const existing = queryClient.getQueryData<WorldPartyGrantRow[]>(key) ?? [];
      const existingIds = new Set(existing.map((grant) => grant.partyId));
      const addedParties = args.parties.filter((party) => !existingIds.has(party._id));
      queryClient.setQueryData<WorldPartyGrantRow[]>(key, [
        ...addedParties.map((party) => ({
          _id: `optimistic:${randomClientId()}` as Id<"worldPartyGrants">,
          worldId: args.worldId,
          partyId: party._id,
          partyName: party.name,
          grantedBy: "optimistic" as Id<"users">,
          createdAt: now,
        })),
        ...existing,
      ]);
      for (const party of addedParties) {
        queryClient.setQueryData<number>(partyWorldGrantCountQueryKey(party._id), (old) => {
          if (old === undefined) return old;
          return old + 1;
        });
      }
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("grantPartyFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
