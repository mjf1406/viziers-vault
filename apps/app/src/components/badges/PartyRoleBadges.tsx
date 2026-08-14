import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
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

export function PartyRoleBadge({ role, className }: PartyRoleBadgeProps) {
  const { t } = useTranslation("parties");
  const labelKey =
    role in PARTY_ROLE_LABEL_KEYS ? PARTY_ROLE_LABEL_KEYS[role as KnownPartyRole] : null;
  const label = labelKey ? t(labelKey) : role;

  return (
    <Badge variant="outline" className={cn(className)}>
      {label}
    </Badge>
  );
}
