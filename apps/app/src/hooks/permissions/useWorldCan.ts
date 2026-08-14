import { useWorldPermissionsContext } from "@/components/permissions/worldPermissionsContext";
import type { WorldPermission } from "@/lib/permissions/worldPermissions";

export function useWorldCan() {
  const { can, role, isPending, permissions } = useWorldPermissionsContext();
  return {
    can: (permission: WorldPermission | string) => can(permission),
    role,
    isPending,
    permissions,
  };
}
