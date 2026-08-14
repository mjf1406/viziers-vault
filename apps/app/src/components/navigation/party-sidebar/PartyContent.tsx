import { Outlet } from "@tanstack/react-router";

import PendingComponent from "@/components/loading/PendingComponent";

export function PartyContent({ partyPending }: { partyPending: boolean }) {
  if (partyPending) {
    return <PendingComponent inset />;
  }

  return <Outlet />;
}
