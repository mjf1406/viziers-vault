import { matchesPermissionPattern } from "@djpanda/convex-authz";

export type {
  WorldPermission,
  WorldRole,
  WorldJoinCodeRole,
  PartyJoinCodeRole,
  MemberListRole,
  PermissionOverrideEffect,
  PermissionOverrideTargetRole,
} from "../../../convex/lib/authzModel";
export {
  WORLD_ROLE_RANK,
  WORLD_ROLES,
  GRANTABLE_WORLD_PERMISSIONS,
  WORLD_JOIN_CODE_ROLES,
  PARTY_JOIN_CODE_ROLES,
  JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE,
  MEMBER_LIST_AUTHZ_ROLES,
  MEMBER_LIST_READ_PERMISSION_BY_ROLE,
  PERMISSION_OVERRIDE_TARGET_ROLES,
  REMOVE_PERMISSION_BY_ROLE,
  assignableWorldRolesFor,
  canChangeMemberRole,
  canManageWorldRoles,
  worldScope,
  effectivePermissionEnabled,
  grantablePermissionGroups,
  isWorldRole,
  isGrantableWorldPermission,
  isWorldJoinCodeRole,
  isPartyJoinCodeRole,
  isPermissionOverrideTargetRole,
  isStrictlyBelow,
  permissionsForRole,
  pickHighestWorldRole,
  SUSPEND_PERMISSION_BY_ROLE,
} from "../../../convex/lib/authzModel";

import {
  permissionsForRole,
  type WorldPermission,
  type WorldRole,
} from "../../../convex/lib/authzModel";

export function createPermissionChecker(granted: ReadonlyArray<string>) {
  return function can(permission: WorldPermission | string): boolean {
    if (granted.length === 0) return false;
    if (granted.includes(permission)) return true;
    return granted.some((pattern) => matchesPermissionPattern(permission, pattern));
  };
}

export function permissionsFromRole(role: WorldRole | null | undefined): Array<string> {
  if (!role) return [];
  return permissionsForRole(role);
}
