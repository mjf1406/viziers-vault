import { useMemo } from "react";

import type { WorldPublic } from "@/lib/worlds/worlds";

export function useWorldSearch({
  worlds,
  query,
}: {
  worlds: Array<WorldPublic> | undefined;
  query: string;
}) {
  const filtered = useMemo(() => {
    const list = worlds ?? [];
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return list;
    return list.filter((world) => {
      const haystack = [world.name, world.description ?? ""].join(" ").toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [worlds, query]);

  return { filtered };
}
