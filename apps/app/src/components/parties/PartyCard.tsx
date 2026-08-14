import { Link } from "@tanstack/react-router";
import { ArchiveIcon, ArchiveRestoreIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { PartyRoleBadge } from "@/components/badges/PartyRoleBadges";
import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import { ActionMenu, type ActionMenuItem } from "@/components/ui/action-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PartyPublic } from "@/lib/parties/parties";
import type { EntityViewMode } from "@/lib/worlds/worldSort";
import { cn } from "@/lib/utils";

type PartyCardProps = {
  party: PartyPublic;
  viewMode: EntityViewMode;
  onEdit: (party: PartyPublic) => void;
  onArchiveToggle: (party: PartyPublic) => void;
  onDelete: (party: PartyPublic) => void;
};

function formatTimestamp(value: number, language: string): string {
  return new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function PartyCard({ party, viewMode, onEdit, onArchiveToggle, onDelete }: PartyCardProps) {
  const { t, i18n } = useTranslation("parties");
  const isArchived = party.archivedAt !== undefined;
  const description = party.description?.trim() || t("noDescription");
  const isOwner = party.role === "owner";

  const menuItems = useMemo<Array<ActionMenuItem>>(
    () => [
      ...(isOwner
        ? ([
            {
              id: "edit",
              label: t("editAction"),
              icon: <PencilIcon />,
              group: "manage",
              onSelect: () => onEdit(party),
            },
            {
              id: "archive",
              label: isArchived ? t("restoreAction") : t("archiveAction"),
              icon: isArchived ? <ArchiveRestoreIcon /> : <ArchiveIcon />,
              group: "manage",
              onSelect: () => onArchiveToggle(party),
            },
            {
              id: "delete",
              label: t("deleteAction"),
              icon: <Trash2Icon />,
              variant: "destructive" as const,
              group: "danger",
              onSelect: () => onDelete(party),
            },
          ] satisfies Array<ActionMenuItem>)
        : []),
    ],
    [isArchived, isOwner, onArchiveToggle, onDelete, onEdit, party, t],
  );

  const menu = isOwner ? <ActionMenu items={menuItems} label={t("partyActions")} /> : null;
  const openLink = (
    <Link
      to="/party/$partyId"
      params={{ partyId: party._id }}
      className="absolute inset-0 z-0 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={t("openParty", { name: party.name })}
    />
  );

  if (viewMode === "list") {
    return (
      <div
        className={cn(
          "relative flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 transition-colors hover:bg-accent/40",
          isArchived && "opacity-80",
        )}
      >
        {openLink}
        <EntityIconDisplay icon={party.icon} imageFileId={party.imageFileId} alt={party.name} />
        <div className="relative z-10 min-w-0 flex-1 pointer-events-none">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium text-foreground">{party.name}</p>
            <PartyRoleBadge role={party.role} />
          </div>
          <p className="truncate text-sm text-muted-foreground">{description}</p>
        </div>
        {menu}
      </div>
    );
  }

  return (
    <Card
      size="sm"
      className={cn("relative transition-colors hover:bg-accent/40", isArchived && "opacity-80")}
    >
      {openLink}
      <CardHeader className="relative z-10 flex flex-row items-start gap-3 pointer-events-none">
        <EntityIconDisplay icon={party.icon} imageFileId={party.imageFileId} alt={party.name} />
        <div className="min-w-0 flex-1">
          <CardTitle className="truncate text-base font-semibold">{party.name}</CardTitle>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <PartyRoleBadge role={party.role} />
          </div>
        </div>
        <div className="shrink-0 pointer-events-auto">{menu}</div>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col gap-3 pointer-events-none">
        <CardDescription className="line-clamp-3">{description}</CardDescription>
        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
          <span>
            {t("createdAt", { date: formatTimestamp(party._creationTime, i18n.language) })}
          </span>
          <span>{t("updatedAt", { date: formatTimestamp(party.updatedAt, i18n.language) })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
