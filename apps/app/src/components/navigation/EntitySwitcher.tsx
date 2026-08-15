import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronsUpDown, Globe, Plus, UserPlus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { PartyRoleIconBadge } from "@/components/badges/PartyRoleBadges";
import { WorldRoleIconBadge } from "@/components/badges/WorldRoleBadges";
import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import { PartyFormCredenza } from "@/components/parties/PartyFormCredenza";
import { useOptionalWorldPermissionsContext } from "@/components/permissions/worldPermissionsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { WorldFormCredenza } from "@/components/worlds/WorldFormCredenza";
import { useCreateParty } from "@/hooks/parties/useCreateParty";
import { useParties } from "@/hooks/parties/useParties";
import { useCreateWorld } from "@/hooks/worlds/useCreateWorld";
import { useWorlds } from "@/hooks/worlds/useWorlds";
import { optionalFileId } from "@/lib/files/optionalFileId";
import type { PartyDoc, PartyPublic } from "@/lib/parties/parties";
import type { PartyFormValues } from "@/lib/parties/partyFormSchema";
import { partyRouteFromPathname } from "@/lib/parties/partyRoutes";
import type { WorldDoc, WorldPublic } from "@/lib/worlds/worlds";
import type { WorldFormValues } from "@/lib/worlds/worldFormSchema";
import { worldRouteFromPathname } from "@/lib/worlds/worldRoutes";
import { cn } from "@/lib/utils";

type EntitySwitcherProps =
  | { current: { kind: "world"; world: WorldDoc } }
  | { current: { kind: "party"; party: PartyDoc } };

type CreateKind = "world" | "party" | null;

function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

function EntityKindMarker({ kind }: { kind: "world" | "party" }) {
  const { t } = useTranslation("common");
  const label = kind === "world" ? t("entityKindWorld") : t("entityKindParty");
  const Icon = kind === "world" ? Globe : Users;

  return (
    <Tooltip>
      <TooltipTrigger
        render={<span className="inline-flex shrink-0 items-center text-muted-foreground" />}
      >
        <Icon className="size-3.5" aria-hidden />
        <span className="sr-only">{label}</span>
      </TooltipTrigger>
      <TooltipContent side="top" className="z-[100]">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function EntitySwitcher({ current }: EntitySwitcherProps) {
  const { t: tCommon } = useTranslation("common");
  const { t: tWorlds } = useTranslation("worlds");
  const { t: tParties } = useTranslation("parties");
  const { isMobile, setOpenMobile } = useSidebar();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const worldPermissions = useOptionalWorldPermissionsContext();
  const { data: worlds = [] } = useWorlds();
  const { data: parties = [] } = useParties();
  const createWorld = useCreateWorld();
  const createParty = useCreateParty();
  const [createKind, setCreateKind] = useState<CreateKind>(null);

  const currentId = current.kind === "world" ? current.world._id : current.party._id;
  const currentName = current.kind === "world" ? current.world.name : current.party.name;
  const currentIcon = current.kind === "world" ? current.world.icon : current.party.icon;
  const currentImageFileId =
    current.kind === "world" ? current.world.imageFileId : current.party.imageFileId;

  const currentWorldRole =
    current.kind === "world"
      ? (worldPermissions?.role ??
        worlds.find((world) => world._id === current.world._id)?.role ??
        null)
      : null;
  const currentPartyRole =
    current.kind === "party"
      ? (parties.find((party) => party._id === current.party._id)?.role ?? null)
      : null;

  const visibleWorlds = useMemo(() => {
    const filtered = worlds.filter(
      (world) => world.archivedAt === undefined || world._id === currentId,
    );
    return sortByName(filtered);
  }, [worlds, currentId]);

  const visibleParties = useMemo(() => {
    const filtered = parties.filter(
      (party) => party.archivedAt === undefined || party._id === currentId,
    );
    return sortByName(filtered);
  }, [parties, currentId]);

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const goToWorld = (world: Pick<WorldPublic, "_id">) => {
    closeMobileSidebar();
    const to =
      current.kind === "world"
        ? worldRouteFromPathname(pathname, current.world._id)
        : "/world/$worldId";
    void navigate({ to, params: { worldId: world._id } });
  };

  const goToParty = (party: Pick<PartyPublic, "_id">) => {
    closeMobileSidebar();
    const to =
      current.kind === "party"
        ? partyRouteFromPathname(pathname, current.party._id)
        : "/party/$partyId";
    void navigate({ to, params: { partyId: party._id } });
  };

  const handleCreateWorld = async (values: WorldFormValues) => {
    const created = await createWorld.mutateAsync({
      name: values.name,
      description: values.description,
      icon: values.icon,
      imageFileId: optionalFileId(values.imageFileId),
    });
    closeMobileSidebar();
    void navigate({
      to: "/world/$worldId",
      params: { worldId: created._id },
    });
  };

  const handleCreateParty = async (values: PartyFormValues) => {
    const created = await createParty.mutateAsync({
      name: values.name,
      description: values.description,
      icon: values.icon,
      imageFileId: optionalFileId(values.imageFileId),
    });
    closeMobileSidebar();
    void navigate({
      to: "/party/$partyId",
      params: { partyId: created._id },
    });
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                />
              }
            >
              <EntityIconDisplay
                icon={currentIcon}
                imageFileId={currentImageFileId}
                className="size-8 shrink-0"
                fallbackClassName="size-8"
                alt=""
              />
              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentName}</span>
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-1.5 group-data-[collapsible=icon]:hidden">
                <EntityKindMarker kind={current.kind} />
                {current.kind === "world" && currentWorldRole ? (
                  <WorldRoleIconBadge role={currentWorldRole} />
                ) : null}
                {current.kind === "party" && currentPartyRole ? (
                  <PartyRoleIconBadge role={currentPartyRole} />
                ) : null}
                <ChevronsUpDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              {visibleWorlds.length > 0 ? (
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {tWorlds("sectionTitle")}
                  </DropdownMenuLabel>
                  {visibleWorlds.map((world) => (
                    <DropdownMenuItem
                      key={world._id}
                      className={cn("gap-2 p-2", world._id === currentId && "font-medium")}
                      onClick={() => goToWorld(world)}
                    >
                      <EntityIconDisplay
                        icon={world.icon}
                        imageFileId={world.imageFileId}
                        className="size-6 shrink-0"
                        fallbackClassName="size-6"
                        alt=""
                      />
                      <span className="min-w-0 flex-1 truncate">{world.name}</span>
                      <span className="flex shrink-0 items-center gap-1">
                        <EntityKindMarker kind="world" />
                        <WorldRoleIconBadge role={world.role} />
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              ) : null}
              {visibleWorlds.length > 0 && visibleParties.length > 0 ? (
                <DropdownMenuSeparator />
              ) : null}
              {visibleParties.length > 0 ? (
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {tParties("sectionTitle")}
                  </DropdownMenuLabel>
                  {visibleParties.map((party) => (
                    <DropdownMenuItem
                      key={party._id}
                      className={cn("gap-2 p-2", party._id === currentId && "font-medium")}
                      onClick={() => goToParty(party)}
                    >
                      <EntityIconDisplay
                        icon={party.icon}
                        imageFileId={party.imageFileId}
                        className="size-6 shrink-0"
                        fallbackClassName="size-6"
                        alt=""
                      />
                      <span className="min-w-0 flex-1 truncate">{party.name}</span>
                      <span className="flex shrink-0 items-center gap-1">
                        <EntityKindMarker kind="party" />
                        <PartyRoleIconBadge role={party.role} />
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              ) : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onClick={() => setCreateKind("world")}>
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="min-w-0 flex-1 truncate font-medium text-muted-foreground">
                  {tWorlds("createWorld")}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2" onClick={() => setCreateKind("party")}>
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="min-w-0 flex-1 truncate font-medium text-muted-foreground">
                  {tParties("createParty")}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => {
                  closeMobileSidebar();
                  void navigate({ to: "/join" });
                }}
              >
                <div className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-transparent">
                  <UserPlus className="size-4" />
                </div>
                <div className="min-w-0 flex-1 truncate font-medium text-muted-foreground">
                  {tCommon("join")}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <WorldFormCredenza
        open={createKind === "world"}
        onOpenChange={(open) => setCreateKind(open ? "world" : null)}
        mode="create"
        onSubmit={handleCreateWorld}
      />
      <PartyFormCredenza
        open={createKind === "party"}
        onOpenChange={(open) => setCreateKind(open ? "party" : null)}
        mode="create"
        onSubmit={handleCreateParty}
      />
    </>
  );
}
