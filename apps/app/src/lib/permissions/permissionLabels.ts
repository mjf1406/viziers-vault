import type { WorldPermission } from "@/lib/permissions/worldPermissions";
import { grantablePermissionGroups } from "@/lib/permissions/worldPermissions";

/** i18n key for a grantable permission label (`worlds.perm_world_read`). */
export function permissionLabelKey(permission: string): string {
  return `perm_${permission.replace(":", "_")}`;
}

/** i18n key for a permission resource group (`worlds.permGroup_world`). */
export function permissionGroupLabelKey(resource: string): string {
  return `permGroup_${resource}`;
}

export function groupedGrantablePermissions(): Array<{
  resource: string;
  groupKey: string;
  permissions: Array<{ permission: WorldPermission; labelKey: string }>;
}> {
  return grantablePermissionGroups().map((group) => ({
    resource: group.resource,
    groupKey: permissionGroupLabelKey(group.resource),
    permissions: group.permissions.map((permission) => ({
      permission,
      labelKey: permissionLabelKey(permission),
    })),
  }));
}
