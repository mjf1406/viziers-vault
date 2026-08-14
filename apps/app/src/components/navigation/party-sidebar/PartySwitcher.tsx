import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronsUpDown, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import { PartyRoleBadge } from "@/components/badges/PartyRoleBadges";
import { PartyFormCredenza } from "@/components/parties/PartyFormCredenza";
import { useCreateParty } from "@/hooks/parties/useCreateParty";
import { useOwnedParties } from "@/hooks/parties/useOwnedParties";
import type { PartyDoc } from "@/lib/parties/parties";
import type { PartyFormValues } from "@/lib/parties/partyFormSchema";
import { optionalFileId } from "@/lib/files/optionalFileId";
import { partyRouteFromPathname } from "@/lib/parties/partyRoutes";
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

type PartySwitcherProps = {
  currentParty: PartyDoc;
};

export function PartySwitcher({ currentParty }: PartySwitcherProps) {
  const { t } = useTranslation("parties");
  const { isMobile, setOpenMobile } = useSidebar();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data: parties = [] } = useOwnedParties();
  const createParty = useCreateParty();
  const [createOpen, setCreateOpen] = useState(false);

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleCreate = async (values: PartyFormValues) => {
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
                icon={currentParty.icon}
                imageFileId={currentParty.imageFileId}
                className="size-8"
                fallbackClassName="size-8"
                alt=""
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentParty.name}</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5 group-data-[collapsible=icon]:hidden">
                <PartyRoleBadge role="owner" />
                <ChevronsUpDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {t("switchParties")}
                </DropdownMenuLabel>
                {parties.map((party) => (
                  <DropdownMenuItem
                    key={party._id}
                    className="gap-2 p-2"
                    onClick={() => {
                      closeMobileSidebar();
                      void navigate({
                        to: partyRouteFromPathname(pathname, currentParty._id),
                        params: { partyId: party._id },
                      });
                    }}
                  >
                    <EntityIconDisplay
                      icon={party.icon}
                      imageFileId={party.imageFileId}
                      className="size-6"
                      fallbackClassName="size-6"
                      alt=""
                    />
                    <span className="min-w-0 flex-1 truncate">{party.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onClick={() => setCreateOpen(true)}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">{t("createParty")}</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => {
                  closeMobileSidebar();
                  void navigate({ to: "/join" });
                }}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <UserPlus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">{t("join")}</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <PartyFormCredenza
        open={createOpen}
        onOpenChange={setCreateOpen}
        mode="create"
        onSubmit={handleCreate}
      />
    </>
  );
}
