/**
 * @deprecated Import from `@/lib/permissions/worldPermissions` instead.
 * Compatibility re-exports for the classroom → world migration.
 */
export type {
  WorldPermission as ClassPermission,
  WorldRole as ClassRole,
  WorldJoinCodeRole as JoinCodeRole,
  PartyJoinCodeRole,
  MemberListRole,
  PermissionOverrideEffect,
  PermissionOverrideTargetRole,
} from "./worldPermissions";

export {
  WORLD_ROLE_RANK as CLASS_ROLE_RANK,
  WORLD_ROLES as CLASS_ROLES,
  GRANTABLE_WORLD_PERMISSIONS as GRANTABLE_CLASS_PERMISSIONS,
  JOIN_CODE_INVITE_PERMISSION_BY_WORLD_ROLE as JOIN_CODE_INVITE_PERMISSION_BY_ROLE,
  WORLD_JOIN_CODE_ROLES as JOIN_CODE_ROLES,
  MEMBER_LIST_AUTHZ_ROLES,
  MEMBER_LIST_READ_PERMISSION_BY_ROLE,
  PERMISSION_OVERRIDE_TARGET_ROLES,
  REMOVE_PERMISSION_BY_ROLE,
  assignableWorldRolesFor as assignableRolesFor,
  canChangeMemberRole,
  canManageWorldRoles as canManageClassRoles,
  worldScope as classScope,
  effectivePermissionEnabled,
  grantablePermissionGroups,
  isWorldRole as isClassRole,
  isGrantableWorldPermission as isGrantableClassPermission,
  isWorldJoinCodeRole as isJoinCodeRole,
  isPartyJoinCodeRole,
  isPermissionOverrideTargetRole,
  isStrictlyBelow,
  permissionsForRole,
  pickHighestWorldRole as pickHighestClassRole,
  SUSPEND_PERMISSION_BY_ROLE,
  createPermissionChecker,
  permissionsFromRole,
} from "./worldPermissions";
