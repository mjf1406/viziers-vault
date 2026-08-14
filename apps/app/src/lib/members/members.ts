import type { Id } from "../../../convex/_generated/dataModel";
import type {
  MemberListRole,
  WorldJoinCodeRole,
  WorldPermission,
} from "@/lib/permissions/worldPermissions";
import {
  assignableWorldRolesFor,
  canChangeMemberRole,
  REMOVE_PERMISSION_BY_ROLE,
} from "@/lib/permissions/worldPermissions";

export type WorldStaffMemberPublic = {
  userId: Id<"users">;
  name?: string;
  image?: string;
  email?: string;
  role: "owner" | "game_master" | "assistant_game_master";
};

export type WorldPlayerPublic = {
  userId: Id<"users">;
  name?: string;
  image?: string;
  email?: string;
  partyId: Id<"parties">;
  partyName: string;
};

export type PartyMemberPublic = {
  userId: Id<"users">;
  name?: string;
  image?: string;
  email?: string;
  role: "leader" | "member";
};

export type WorldMemberCounts = {
  game_master: number | null;
  assistant_game_master: number | null;
  players: number | null;
};

export type { WorldJoinCodeRole, MemberListRole };

export function removePermissionForStaff(
  role: WorldStaffMemberPublic["role"],
): WorldPermission | null {
  return REMOVE_PERMISSION_BY_ROLE[role];
}

export function memberListRoleFor(role: WorldStaffMemberPublic["role"]): MemberListRole {
  if (role === "owner" || role === "game_master") return "game_master";
  return "assistant_game_master";
}

export { assignableWorldRolesFor as assignableRolesFor, canChangeMemberRole };

export function roleLabelKey(
  role: WorldStaffMemberPublic["role"] | WorldJoinCodeRole | "leader" | "member",
): string {
  switch (role) {
    case "owner":
      return "roleOwner";
    case "game_master":
      return "roleGameMaster";
    case "assistant_game_master":
      return "roleAssistantGameMaster";
    case "leader":
      return "roleLeader";
    case "member":
      return "roleMember";
    default:
      return "roleMember";
  }
}
