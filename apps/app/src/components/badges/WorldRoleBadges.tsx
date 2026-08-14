import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
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

export function WorldRoleBadge({ role, className }: WorldRoleBadgeProps) {
  const { t } = useTranslation("worlds");
  const labelKey =
    role in WORLD_ROLE_LABEL_KEYS ? WORLD_ROLE_LABEL_KEYS[role as KnownWorldRole] : null;
  const label = labelKey ? t(labelKey) : role;

  return (
    <Badge variant="outline" className={cn(className)}>
      {label}
    </Badge>
  );
}

export function WorldRoleSelectLabel({ role, className }: WorldRoleBadgeProps) {
  const { t } = useTranslation("worlds");
  const labelKey =
    role in WORLD_ROLE_LABEL_KEYS ? WORLD_ROLE_LABEL_KEYS[role as KnownWorldRole] : null;
  const label = labelKey ? t(labelKey) : role;
  return <span className={className}>{label}</span>;
}
