import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { MemberBadge, PartyLeaderBadge, WorldOwnerBadge } from "@/components/icons/role-icons";
import { PARTY_ROLE_ICON_COLORS, PARTY_ROLE_ICONS } from "@/components/icons/role-icon-maps";
import { cn } from "@/lib/utils";

const PARTY_ROLE_LABEL_KEYS = {
  owner: "roleOwner",
  leader: "roleLeader",
  member: "roleMember",
} as const;

type KnownPartyRole = keyof typeof PARTY_ROLE_LABEL_KEYS;

type PartyRoleBadgeProps = {
  role: string;
  className?: string;
};

function partyRoleLabel(role: string, t: (key: string) => string): string {
  const labelKey =
    role in PARTY_ROLE_LABEL_KEYS ? PARTY_ROLE_LABEL_KEYS[role as KnownPartyRole] : null;
  return labelKey ? t(labelKey) : role;
}

type PartyRoleSelectLabelProps = {
  role: string;
  /** Role color on the icon. Use for the closed trigger; omit in the menu. */
  colored?: boolean;
  className?: string;
};

/** Icon + translated role label for role `<Select>` triggers and items. */
export function PartyRoleSelectLabel({
  role,
  colored = false,
  className,
}: PartyRoleSelectLabelProps) {
  const { t } = useTranslation("parties");
  const label = partyRoleLabel(role, t);
  const Icon = role in PARTY_ROLE_ICONS ? PARTY_ROLE_ICONS[role as KnownPartyRole] : null;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {Icon ? (
        <Icon className={cn("size-4", !colored && "text-current dark:text-current")} aria-hidden />
      ) : null}
      {label}
    </span>
  );
}

/** Icon + translated role label (party cards, member lists, etc.). */
export function PartyRoleBadge({ role, className }: PartyRoleBadgeProps) {
  const { t } = useTranslation("parties");
  const label = partyRoleLabel(role, t);

  switch (role) {
    case "owner":
      return <WorldOwnerBadge className={className}>{label}</WorldOwnerBadge>;
    case "leader":
      return <PartyLeaderBadge className={className}>{label}</PartyLeaderBadge>;
    case "member":
      return <MemberBadge className={className}>{label}</MemberBadge>;
    default:
      return (
        <Badge variant="outline" className={className}>
          {label}
        </Badge>
      );
  }
}

/** Icon-only role badge (party switcher, compact UI). */
export function PartyRoleIconBadge({ role, className }: PartyRoleBadgeProps) {
  const { t } = useTranslation("parties");
  const label = partyRoleLabel(role, t);
  const Icon = role in PARTY_ROLE_ICONS ? PARTY_ROLE_ICONS[role as KnownPartyRole] : null;
  const colorClass =
    role in PARTY_ROLE_ICON_COLORS ? PARTY_ROLE_ICON_COLORS[role as KnownPartyRole] : null;

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
