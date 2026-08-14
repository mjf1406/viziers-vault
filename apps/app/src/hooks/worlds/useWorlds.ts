import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import { ONE_HOUR } from "@/lib/queryCache";

export function worldsListQueryKey() {
  return convexQuery(api.worlds.listMine, {}).queryKey;
}

export function useWorlds() {
  return useAuthedQuery(api.worlds.listMine, {}, { gcTime: ONE_HOUR });
}

export function useActiveWorlds() {
  const { data, ...rest } = useWorlds();
  const active = (data ?? []).filter((world) => world.archivedAt === undefined);
  return { ...rest, data: active };
}
