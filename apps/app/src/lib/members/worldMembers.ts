import type { Id } from "../../../convex/_generated/dataModel";
import type {
  WorldRole,
  WorldJoinCodeRole,
  MemberListRole,
} from "@/lib/permissions/worldPermissions";
import {
  assignableWorldRolesFor,
  canChangeMemberRole,
  REMOVE_PERMISSION_BY_ROLE,
} from "@/lib/permissions/worldPermissions";

export type WorldStaffMember = {
  userId: Id<"users">;
  name?: string;
  image?: string;
  email?: string;
  role: "owner" | "game_master" | "assistant_game_master";
};

export type WorldPartyPlayer = {
  userId: Id<"users">;
  name?: string;
  image?: string;
  email?: string;
  partyId: Id<"parties">;
  partyName: string;
  partyRole: "leader" | "member";
};

export type WorldMemberCounts = {
  game_master: number | null;
  assistant_game_master: number | null;
  players: number | null;
};

export type { WorldJoinCodeRole, MemberListRole, WorldRole };

export function removePermissionForStaff(
  role: WorldStaffMember["role"],
): (typeof REMOVE_PERMISSION_BY_ROLE)[WorldStaffMember["role"]] {
  return REMOVE_PERMISSION_BY_ROLE[role];
}

export function memberListRoleFor(role: WorldStaffMember["role"]): MemberListRole {
  if (role === "owner" || role === "game_master") return "game_master";
  return "assistant_game_master";
}

export { assignableWorldRolesFor, canChangeMemberRole };

export function worldRoleLabelKey(
  role:
    | WorldStaffMember["role"]
    | WorldJoinCodeRole
    | "player"
    | "party_player"
    | "leader"
    | "member",
):
  | "roleOwner"
  | "roleGameMaster"
  | "roleAssistantGameMaster"
  | "rolePlayer"
  | "rolePartyPlayer"
  | "roleLeader"
  | "roleMember" {
  switch (role) {
    case "owner":
      return "roleOwner";
    case "game_master":
      return "roleGameMaster";
    case "assistant_game_master":
      return "roleAssistantGameMaster";
    case "player":
    case "party_player":
      return "rolePlayer";
    case "leader":
      return "roleLeader";
    case "member":
      return "roleMember";
  }
}
