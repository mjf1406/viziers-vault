import { useConvexMutation } from "@convex-dev/react-query";
import { useTranslation } from "react-i18next";

import { api } from "../../../convex/_generated/api";
import type { FunctionReturnType } from "convex/server";
import type { Id } from "../../../convex/_generated/dataModel";
import { toast } from "@/components/ui/toast-manager";
import { worldFilesListQueryKey } from "@/hooks/files/useWorldFiles";
import { useOptimisticMutation } from "@/hooks/useOptimisticMutation";
import { messageFromError } from "@/lib/errors/convexError";

type WorldFilePublic = FunctionReturnType<typeof api.files.listWorldFiles>[number];

type RenameFileArgs = {
  fileId: Id<"files">;
  name: string;
  /** When set, optimistically renames the file in the world library list. */
  worldId?: Id<"worlds">;
};

export function useRenameFile() {
  const { t } = useTranslation("upload");
  const { t: tCommon } = useTranslation("common");
  const mutationFn = useConvexMutation(api.files.renameFile);

  return useOptimisticMutation({
    mutationFn: (args: RenameFileArgs) => mutationFn({ fileId: args.fileId, name: args.name }),
    queryKeys: (args) => {
      if (args.worldId !== undefined) {
        return [worldFilesListQueryKey(args.worldId)];
      }
      return [];
    },
    applyOptimisticUpdate: (queryClient, args) => {
      if (args.worldId === undefined) {
        return;
      }
      const listKey = worldFilesListQueryKey(args.worldId);
      const name = args.name.trim().slice(0, 255) || "file";
      queryClient.setQueryData<WorldFilePublic[]>(listKey, (old) => {
        if (!old) return old;
        return old.map((file) => (file._id === args.fileId ? { ...file, name } : file));
      });
    },
    onError: (error) => {
      toast.add({
        title: messageFromError(error, t("renameFailed"), tCommon("rateLimited")),
        type: "error",
      });
    },
  });
}
