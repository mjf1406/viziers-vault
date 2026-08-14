import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

type RedeemJoinCodeArgs = {
  code: string;
};

export type RedeemJoinCodeResult = {
  targetKind: "world" | "party";
  worldId?: Id<"worlds">;
  partyId?: Id<"parties">;
  role: string;
};

export function useRedeemJoinCode() {
  const queryClient = useQueryClient();
  const mutationFn = useConvexMutation(api.joinCodes.redeem);

  return useMutation({
    mutationFn: (args: RedeemJoinCodeArgs) => mutationFn(args),
    onSuccess: async (result: RedeemJoinCodeResult) => {
      const invalidations: Promise<void>[] = [
        queryClient.invalidateQueries({
          queryKey: convexQuery(api.worlds.listMine, {}).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: convexQuery(api.parties.listMine, {}).queryKey,
        }),
      ];

      if (result.targetKind === "world" && result.worldId) {
        invalidations.push(
          queryClient.invalidateQueries({
            queryKey: convexQuery(api.worlds.get, { worldId: result.worldId }).queryKey,
          }),
          queryClient.invalidateQueries({
            queryKey: convexQuery(api.permissions.forWorld, { worldId: result.worldId }).queryKey,
          }),
        );
      }

      if (result.targetKind === "party" && result.partyId) {
        invalidations.push(
          queryClient.invalidateQueries({
            queryKey: convexQuery(api.parties.get, { partyId: result.partyId }).queryKey,
          }),
        );
      }

      await Promise.all(invalidations);
    },
  });
}
