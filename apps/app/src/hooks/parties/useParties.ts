import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { ONE_HOUR } from "@/lib/queryCache";

export function partiesListQueryKey() {
  return convexQuery(api.parties.listMine, {}).queryKey;
}

export function useParties() {
  return useAuthedQuery(api.parties.listMine, {}, { gcTime: ONE_HOUR });
}

export function useActiveParties() {
  const { data, ...rest } = useParties();
  const active = (data ?? []).filter((party) => party.archivedAt === undefined);
  return { ...rest, data: active };
}
