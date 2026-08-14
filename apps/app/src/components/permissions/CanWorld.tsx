import type { ReactNode } from "react";

import { useWorldCan } from "@/hooks/permissions/useWorldCan";
import type { WorldPermission } from "@/lib/permissions/worldPermissions";

type CanWorldProps = {
  permission: WorldPermission;
  children: ReactNode;
};

export function CanWorld({ permission, children }: CanWorldProps) {
  const { can, isPending } = useWorldCan();
  if (isPending || !can(permission)) {
    return null;
  }
  return children;
}
