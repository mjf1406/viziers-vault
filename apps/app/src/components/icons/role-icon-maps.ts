import {
  AssistantGameMasterIcon,
  AssistantTeacherIcon,
  GameMasterIcon,
  GuardianIcon,
  MemberIcon,
  OwnerIcon,
  PartyLeaderIcon,
  StudentIcon,
  TeacherIcon,
  WorldOwnerIcon,
} from "@/components/icons/role-icons";

export const CLASS_ROLE_ICONS = {
  owner: OwnerIcon,
  teacher: TeacherIcon,
  assistant_teacher: AssistantTeacherIcon,
  student: StudentIcon,
  guardian: GuardianIcon,
} as const;

export const WORLD_ROLE_ICONS = {
  owner: WorldOwnerIcon,
  game_master: GameMasterIcon,
  assistant_game_master: AssistantGameMasterIcon,
  player: MemberIcon,
  world_member: MemberIcon,
  party_player: MemberIcon,
} as const;

export const PARTY_ROLE_ICONS = {
  owner: WorldOwnerIcon,
  leader: PartyLeaderIcon,
  member: MemberIcon,
} as const;

export const WORLD_ROLE_ICON_COLORS = {
  owner: "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400",
  game_master: "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400",
  assistant_game_master: "border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400",
  player: "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
  world_member: "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
  party_player: "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
} as const;

export const PARTY_ROLE_ICON_COLORS = {
  owner: "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400",
  leader: "border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400",
  member: "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
} as const;
