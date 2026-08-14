import { convexQuery } from "@convex-dev/react-query";

import { useAuthedQuery } from "@/hooks/useAuthedQuery";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { FIVE_MINUTES } from "@/lib/queryCache";

export function worldFilesListQueryKey(worldId: Id<"worlds">) {
  return convexQuery(api.files.listWorldFiles, { worldId }).queryKey;
}

export function useWorldFiles(worldId: Id<"worlds">) {
  return useAuthedQuery(api.files.listWorldFiles, { worldId }, { gcTime: FIVE_MINUTES });
}
