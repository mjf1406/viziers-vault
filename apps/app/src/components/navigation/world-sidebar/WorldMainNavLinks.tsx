import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronRight,
  KeyRound,
  LayoutDashboard,
  Mail,
  Settings2,
  Shield,
  Swords,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { useWorldMemberCounts } from "@/hooks/members/useWorldMemberCounts";
import { useWorldCan } from "@/hooks/permissions/useWorldCan";
import type { WorldDoc } from "@/lib/worlds/worlds";
import { worldPathFor, type WorldNavTo } from "@/lib/worlds/worldRoutes";
import type { MemberListRole } from "@/lib/permissions/worldPermissions";
import type { WorldPermission } from "@/lib/permissions/worldPermissions";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  icon: LucideIcon;
  to: WorldNavTo;
  permission: WorldPermission;
  countRole?: MemberListRole | "players";
};

export function WorldNavMain({ worldDoc }: { worldDoc: WorldDoc }) {
  const { t } = useTranslation("worlds");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { isMobile, state, setOpenMobile } = useSidebar();
  const { can, isPending } = useWorldCan();
  const worldId = worldDoc._id;
  const { data: memberCounts } = useWorldMemberCounts(worldId);
  const peopleCollapsed = state === "collapsed" && !isMobile;
  const [peopleOpen, setPeopleOpen] = useState(false);

  const countFor = (role: MemberListRole | "players" | undefined): number | null => {
    if (!role) return null;
    return memberCounts?.[role] ?? null;
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const topItems: Array<NavItem> = [
    {
      title: t("navDashboard"),
      icon: LayoutDashboard,
      to: "/world/$worldId",
      permission: "world:read",
    },
    {
      title: t("navPermissions"),
      icon: KeyRound,
      to: "/world/$worldId/permissions",
      permission: "permissions:manage",
    },
    {
      title: t("navSettings"),
      icon: Settings2,
      to: "/world/$worldId/settings",
      permission: "world:update",
    },
    {
      title: t("navPartiesGrants"),
      icon: Shield,
      to: "/world/$worldId/parties-grants",
      permission: "parties:read",
    },
  ];

  const peopleItems: Array<NavItem> = [
    {
      title: t("navGameMasters"),
      icon: Swords,
      to: "/world/$worldId/game-masters",
      permission: "game_masters:read",
      countRole: "game_master",
    },
    {
      title: t("navAssistantGameMasters"),
      icon: UserRound,
      to: "/world/$worldId/assistant-game-masters",
      permission: "assistant_game_masters:read",
      countRole: "assistant_game_master",
    },
    {
      title: t("navPlayers"),
      icon: Users,
      to: "/world/$worldId/players",
      permission: "players:read",
      countRole: "players",
    },
    {
      title: t("navInvitations"),
      icon: Mail,
      to: "/world/$worldId/invitations",
      permission: "invitations:read",
    },
  ];

  if (isPending) {
    return null;
  }

  const visibleTopItems = topItems.filter((item) => can(item.permission));
  const visiblePeopleItems = peopleItems.filter((item) => can(item.permission));
  const peopleActive = visiblePeopleItems.some(
    (item) => pathname === worldPathFor(item.to, worldId),
  );

  return (
    <>
      {visibleTopItems.length > 0 ? (
        <SidebarGroup>
          <SidebarGroupLabel>{t("pageTitle")}</SidebarGroupLabel>
          <SidebarMenu>
            {visibleTopItems.map((item) => {
              const href = worldPathFor(item.to, worldId);
              const isActive =
                item.to === "/world/$worldId"
                  ? pathname === href
                  : pathname === href || pathname.startsWith(`${href}/`);

              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    render={<Link to={item.to} params={{ worldId }} onClick={closeMobileSidebar} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ) : null}

      {visiblePeopleItems.length > 0 ? (
        <SidebarGroup>
          <SidebarMenu>
            {peopleCollapsed ? (
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <SidebarMenuButton tooltip={t("navGroupPeople")} isActive={peopleActive} />
                    }
                  >
                    <Users />
                    <span>{t("navGroupPeople")}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="min-w-56 rounded-lg"
                    align="start"
                    side="right"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        {t("navGroupPeople")}
                      </DropdownMenuLabel>
                      {visiblePeopleItems.map((item) => {
                        const count = countFor(item.countRole);
                        return (
                          <DropdownMenuItem
                            key={item.to}
                            className="gap-2 p-2"
                            render={
                              <Link
                                to={item.to}
                                params={{ worldId }}
                                onClick={closeMobileSidebar}
                              />
                            }
                          >
                            <item.icon />
                            <span className="min-w-0 flex-1 truncate">{item.title}</span>
                            {count !== null ? (
                              <span className="ml-auto tabular-nums text-muted-foreground">
                                {count}
                              </span>
                            ) : null}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ) : (
              <Collapsible
                open={peopleOpen || peopleActive}
                onOpenChange={setPeopleOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
                    <Users />
                    <span>{t("navGroupPeople")}</span>
                    <ChevronRight
                      className={cn(
                        "ml-auto transition-transform group-data-[collapsible=icon]:hidden",
                        (peopleOpen || peopleActive) && "rotate-90",
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {visiblePeopleItems.map((item) => {
                        const href = worldPathFor(item.to, worldId);
                        const isActive = pathname === href;
                        const count = countFor(item.countRole);
                        return (
                          <SidebarMenuSubItem key={item.to}>
                            <SidebarMenuSubButton
                              isActive={isActive}
                              className={count !== null ? "pr-8" : undefined}
                              render={
                                <Link
                                  to={item.to}
                                  params={{ worldId }}
                                  onClick={closeMobileSidebar}
                                />
                              }
                            >
                              <item.icon />
                              <span>{item.title}</span>
                            </SidebarMenuSubButton>
                            {count !== null ? (
                              <SidebarMenuBadge className="top-1">{count}</SidebarMenuBadge>
                            ) : null}
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )}
          </SidebarMenu>
        </SidebarGroup>
      ) : null}
    </>
  );
}
