import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import {
  AssistantGameMasterBadge,
  GameMasterBadge,
  MemberBadge,
  WorldOwnerBadge,
} from "@/components/icons/role-icons";
import { WORLD_ROLE_ICON_COLORS, WORLD_ROLE_ICONS } from "@/components/icons/role-icon-maps";
import { cn } from "@/lib/utils";

const WORLD_ROLE_LABEL_KEYS = {
  owner: "roleOwner",
  game_master: "roleGameMaster",
  assistant_game_master: "roleAssistantGameMaster",
  player: "rolePlayer",
  world_member: "rolePlayer",
  party_player: "rolePlayer",
} as const;

type KnownWorldRole = keyof typeof WORLD_ROLE_LABEL_KEYS;

type WorldRoleBadgeProps = {
  role: string;
  className?: string;
};

function worldRoleLabel(role: string, t: (key: string) => string): string {
  const labelKey =
    role in WORLD_ROLE_LABEL_KEYS ? WORLD_ROLE_LABEL_KEYS[role as KnownWorldRole] : null;
  return labelKey ? t(labelKey) : role;
}

type WorldRoleSelectLabelProps = {
  role: string;
  /** Role color on the icon. Use for the closed trigger; omit in the menu. */
  colored?: boolean;
  className?: string;
};

/** Icon + translated role label for role `<Select>` triggers and items. */
export function WorldRoleSelectLabel({
  role,
  colored = false,
  className,
}: WorldRoleSelectLabelProps) {
  const { t } = useTranslation("worlds");
  const label = worldRoleLabel(role, t);
  const Icon = role in WORLD_ROLE_ICONS ? WORLD_ROLE_ICONS[role as KnownWorldRole] : null;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {Icon ? (
        <Icon className={cn("size-4", !colored && "text-current dark:text-current")} aria-hidden />
      ) : null}
      {label}
    </span>
  );
}

/** Icon + translated role label (world cards, staff lists, etc.). */
export function WorldRoleBadge({ role, className }: WorldRoleBadgeProps) {
  const { t } = useTranslation("worlds");
  const label = worldRoleLabel(role, t);

  switch (role) {
    case "owner":
      return <WorldOwnerBadge className={className}>{label}</WorldOwnerBadge>;
    case "game_master":
      return <GameMasterBadge className={className}>{label}</GameMasterBadge>;
    case "assistant_game_master":
      return <AssistantGameMasterBadge className={className}>{label}</AssistantGameMasterBadge>;
    case "player":
    case "world_member":
    case "party_player":
      return <MemberBadge className={className}>{label}</MemberBadge>;
    default:
      return (
        <Badge variant="outline" className={className}>
          {label}
        </Badge>
      );
  }
}

/** Icon-only role badge (world switcher, compact UI). */
export function WorldRoleIconBadge({ role, className }: WorldRoleBadgeProps) {
  const { t } = useTranslation("worlds");
  const label = worldRoleLabel(role, t);
  const Icon = role in WORLD_ROLE_ICONS ? WORLD_ROLE_ICONS[role as KnownWorldRole] : null;
  const colorClass =
    role in WORLD_ROLE_ICON_COLORS ? WORLD_ROLE_ICON_COLORS[role as KnownWorldRole] : null;

  if (!Icon || !colorClass) {
    return null;
  }

  return (
    <Badge
      variant="outline"
      aria-label={label}
      className={cn("gap-0 px-1.5", colorClass, className)}
    >
      <Icon className="size-3" aria-hidden />
    </Badge>
  );
}
