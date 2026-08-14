import { Outlet } from "@tanstack/react-router";

import PendingComponent from "@/components/loading/PendingComponent";
import { useWorldPermissionsContext } from "@/components/permissions/worldPermissionsContext";

export function WorldContent({ worldPending }: { worldPending: boolean }) {
  const { isPending: permissionsPending } = useWorldPermissionsContext();

  if (worldPending || permissionsPending) {
    return <PendingComponent inset />;
  }

  return <Outlet />;
}
