import { Link } from "@tanstack/react-router";
import { ArchiveIcon, ArchiveRestoreIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { WorldRoleBadge } from "@/components/badges/WorldRoleBadges";
import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import { ActionMenu, type ActionMenuItem } from "@/components/ui/action-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { WorldPublic } from "@/lib/worlds/worlds";
import type { EntityViewMode } from "@/lib/worlds/worldSort";
import { cn } from "@/lib/utils";

type WorldCardProps = {
  world: WorldPublic;
  viewMode: EntityViewMode;
  onEdit: (world: WorldPublic) => void;
  onArchiveToggle: (world: WorldPublic) => void;
  onDelete: (world: WorldPublic) => void;
};

function formatTimestamp(value: number, language: string): string {
  return new Intl.DateTimeFormat(language, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function WorldCard({ world, viewMode, onEdit, onArchiveToggle, onDelete }: WorldCardProps) {
  const { t, i18n } = useTranslation("worlds");
  const isArchived = world.archivedAt !== undefined;
  const description = world.description?.trim() || t("noDescription");

  const menuItems = useMemo<Array<ActionMenuItem>>(
    () => [
      {
        id: "edit",
        label: t("editAction"),
        icon: <PencilIcon />,
        permission: "world:update",
        group: "manage",
        onSelect: () => onEdit(world),
      },
      {
        id: "archive",
        label: isArchived ? t("restoreAction") : t("archiveAction"),
        icon: isArchived ? <ArchiveRestoreIcon /> : <ArchiveIcon />,
        permission: "world:archive",
        group: "manage",
        onSelect: () => onArchiveToggle(world),
      },
      {
        id: "delete",
        label: t("deleteAction"),
        icon: <Trash2Icon />,
        permission: "world:delete",
        variant: "destructive",
        group: "danger",
        onSelect: () => onDelete(world),
      },
    ],
    [isArchived, onArchiveToggle, onDelete, onEdit, t, world],
  );

  const menu = <ActionMenu items={menuItems} label={t("worldActions")} />;
  const openLink = (
    <Link
      to="/world/$worldId"
      params={{ worldId: world._id }}
      className="absolute inset-0 z-0 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={t("openWorld", { name: world.name })}
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
        <EntityIconDisplay icon={world.icon} imageFileId={world.imageFileId} alt={world.name} />
        <div className="relative z-10 min-w-0 flex-1 pointer-events-none">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-medium text-foreground">{world.name}</p>
            <WorldRoleBadge role={world.role} />
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
        <EntityIconDisplay icon={world.icon} imageFileId={world.imageFileId} alt={world.name} />
        <div className="min-w-0 flex-1">
          <CardTitle className="truncate text-base font-semibold">{world.name}</CardTitle>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <WorldRoleBadge role={world.role} />
          </div>
        </div>
        <div className="shrink-0 pointer-events-auto">{menu}</div>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col gap-3 pointer-events-none">
        <CardDescription className="line-clamp-3">{description}</CardDescription>
        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
          <span>
            {t("createdAt", { date: formatTimestamp(world._creationTime, i18n.language) })}
          </span>
          <span>{t("updatedAt", { date: formatTimestamp(world.updatedAt, i18n.language) })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
