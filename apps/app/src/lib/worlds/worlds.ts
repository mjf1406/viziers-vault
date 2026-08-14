import type { FunctionReturnType } from "convex/server";

import { api } from "../../../convex/_generated/api";

export type WorldDoc = NonNullable<FunctionReturnType<typeof api.worlds.get>>;

export type WorldPublic = FunctionReturnType<typeof api.worlds.listMine>[number] & {
  _pending?: boolean;
};

export function isWorldArchived(world: Pick<WorldDoc, "archivedAt">): boolean {
  return world.archivedAt !== undefined;
}

export function isPendingWorld(world: Pick<WorldPublic, "_pending" | "_id">): boolean {
  return world._pending === true || String(world._id).startsWith("optimistic");
}

export function getWorldUpdatedAt(
  world: Pick<WorldDoc, "updatedAt" | "_creationTime">,
): number | undefined {
  if (typeof world.updatedAt === "number") {
    return world.updatedAt;
  }
  return world._creationTime;
}
