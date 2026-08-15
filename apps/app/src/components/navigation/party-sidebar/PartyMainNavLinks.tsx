import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Mail, Settings2, Users, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-context";
import { usePartyMemberCount } from "@/hooks/members/usePartyMemberCount";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { usePartyWorldGrantCount } from "@/hooks/worldPartyGrants/usePartyWorldGrantCount";
import type { PartyDoc } from "@/lib/parties/parties";
import { partyPathFor, type PartyNavTo } from "@/lib/parties/partyRoutes";

type NavItem = {
  title: string;
  icon: LucideIcon;
  to: PartyNavTo;
  ownerOnly?: boolean;
  countKind?: "members" | "connectedWorlds";
};

export function PartyNavMain({ partyDoc }: { partyDoc: PartyDoc }) {
  const { t } = useTranslation("parties");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { isMobile, setOpenMobile } = useSidebar();
  const { data: currentUser } = useCurrentUser();
  const partyId = partyDoc._id;
  const isOwner = currentUser?._id === partyDoc.ownerId;
  const { data: memberCount } = usePartyMemberCount(isOwner ? partyId : "skip");
  const { data: connectedWorldCount } = usePartyWorldGrantCount(isOwner ? partyId : "skip");

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const items: Array<NavItem> = [
    {
      title: t("navDashboard"),
      icon: LayoutDashboard,
      to: "/party/$partyId",
    },
    {
      title: t("navSettings"),
      icon: Settings2,
      to: "/party/$partyId/settings",
      ownerOnly: true,
    },
    {
      title: t("navMembers"),
      icon: Users,
      to: "/party/$partyId/members",
      ownerOnly: true,
      countKind: "members",
    },
    {
      title: t("navInvitations"),
      icon: Mail,
      to: "/party/$partyId/invitations",
      ownerOnly: true,
    },
    {
      title: t("navConnectedWorlds"),
      icon: Globe,
      to: "/party/$partyId/connected-worlds",
      ownerOnly: true,
      countKind: "connectedWorlds",
    },
  ];

  const visibleItems = items.filter((item) => !item.ownerOnly || isOwner);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("pageTitle")}</SidebarGroupLabel>
      <SidebarMenu>
        {visibleItems.map((item) => {
          const href = partyPathFor(item.to, partyId);
          const isActive =
            item.to === "/party/$partyId"
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`);

          const count =
            item.countKind === "members"
              ? (memberCount ?? null)
              : item.countKind === "connectedWorlds"
                ? (connectedWorldCount ?? null)
                : null;

          return (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive}
                className={count !== null ? "pr-8" : undefined}
                render={<Link to={item.to} params={{ partyId }} onClick={closeMobileSidebar} />}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
              {count !== null ? (
                <SidebarMenuBadge className="top-1.5">{count}</SidebarMenuBadge>
              ) : null}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
