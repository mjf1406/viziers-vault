export type EntitySortKey = "name" | "created" | "updated";
export type EntitySortDirection = "asc" | "desc";
export type EntityViewMode = "grid" | "list";

export type SortableEntity = {
  _id: string;
  _creationTime: number;
  name: string;
  updatedAt: number;
  archivedAt?: number;
};

export function compareEntities<T extends SortableEntity>(
  a: T,
  b: T,
  sortKey: EntitySortKey,
  direction: EntitySortDirection,
): number {
  const dir = direction === "asc" ? 1 : -1;
  switch (sortKey) {
    case "name":
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) * dir;
    case "created":
      return (a._creationTime - b._creationTime) * dir;
    case "updated":
      return (a.updatedAt - b.updatedAt) * dir;
  }
}

export function sortEntities<T extends SortableEntity>(
  items: readonly T[],
  sortKey: EntitySortKey,
  direction: EntitySortDirection,
): T[] {
  return [...items].sort((a, b) => compareEntities(a, b, sortKey, direction));
}

export function partitionByArchive<T extends SortableEntity>(
  items: readonly T[],
): { active: T[]; archived: T[] } {
  const active: T[] = [];
  const archived: T[] = [];
  for (const item of items) {
    if (item.archivedAt !== undefined) {
      archived.push(item);
    } else {
      active.push(item);
    }
  }
  return { active, archived };
}

export function nextSortState(
  currentKey: EntitySortKey,
  currentDirection: EntitySortDirection,
  nextKey: EntitySortKey,
): { sortKey: EntitySortKey; sortDirection: EntitySortDirection } {
  if (currentKey === nextKey) {
    return {
      sortKey: currentKey,
      sortDirection: currentDirection === "asc" ? "desc" : "asc",
    };
  }
  return {
    sortKey: nextKey,
    sortDirection: nextKey === "name" ? "asc" : "desc",
  };
}
