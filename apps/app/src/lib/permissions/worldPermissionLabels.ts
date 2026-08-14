import type { WorldPermission } from "@/lib/permissions/worldPermissions";
import { grantablePermissionGroups } from "@/lib/permissions/worldPermissions";

export function worldPermissionLabelKey(permission: string): string {
  return `perm_${permission.replace(":", "_")}`;
}

export function worldPermissionGroupLabelKey(resource: string): string {
  return `permGroup_${resource}`;
}

export function groupedWorldGrantablePermissions(): Array<{
  resource: string;
  groupKey: string;
  permissions: Array<{ permission: WorldPermission; labelKey: string }>;
}> {
  return grantablePermissionGroups().map((group) => ({
    resource: group.resource,
    groupKey: worldPermissionGroupLabelKey(group.resource),
    permissions: group.permissions.map((permission) => ({
      permission,
      labelKey: worldPermissionLabelKey(permission),
    })),
  }));
}
