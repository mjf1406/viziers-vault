import { useMemo } from "react";

import type { PartyPublic } from "@/lib/parties/parties";

export function usePartySearch({
  parties,
  query,
}: {
  parties: Array<PartyPublic> | undefined;
  query: string;
}) {
  const filtered = useMemo(() => {
    const list = parties ?? [];
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return list;
    return list.filter((party) => {
      const haystack = [party.name, party.description ?? ""].join(" ").toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [parties, query]);

  return { filtered };
}
