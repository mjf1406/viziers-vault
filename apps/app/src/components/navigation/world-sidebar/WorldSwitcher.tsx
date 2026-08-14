import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronsUpDown, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import { WorldRoleBadge } from "@/components/badges/WorldRoleBadges";
import { WorldFormCredenza } from "@/components/worlds/WorldFormCredenza";
import { useWorldPermissionsContext } from "@/components/permissions/worldPermissionsContext";
import { useCreateWorld } from "@/hooks/worlds/useCreateWorld";
import { useOwnedWorlds } from "@/hooks/worlds/useOwnedWorlds";
import type { WorldDoc } from "@/lib/worlds/worlds";
import type { WorldFormValues } from "@/lib/worlds/worldFormSchema";
import { worldRouteFromPathname } from "@/lib/worlds/worldRoutes";
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

import { optionalFileId } from "@/lib/files/optionalFileId";

type WorldSwitcherProps = {
  currentWorld: WorldDoc;
};

export function WorldSwitcher({ currentWorld }: WorldSwitcherProps) {
  const { t } = useTranslation("worlds");
  const { isMobile, setOpenMobile } = useSidebar();
  const { role } = useWorldPermissionsContext();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data: worlds = [] } = useOwnedWorlds();
  const createWorld = useCreateWorld();
  const [createOpen, setCreateOpen] = useState(false);

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleCreate = async (values: WorldFormValues) => {
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
                icon={currentWorld.icon}
                imageFileId={currentWorld.imageFileId}
                className="size-8"
                fallbackClassName="size-8"
                alt=""
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{currentWorld.name}</span>
              </div>
              <div className="ml-auto flex items-center gap-1.5 group-data-[collapsible=icon]:hidden">
                {role ? <WorldRoleBadge role={role} /> : null}
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
                  {t("switchWorlds")}
                </DropdownMenuLabel>
                {worlds.map((world) => (
                  <DropdownMenuItem
                    key={world._id}
                    className="gap-2 p-2"
                    onClick={() => {
                      closeMobileSidebar();
                      void navigate({
                        to: worldRouteFromPathname(pathname, currentWorld._id),
                        params: { worldId: world._id },
                      });
                    }}
                  >
                    <EntityIconDisplay
                      icon={world.icon}
                      imageFileId={world.imageFileId}
                      className="size-6"
                      fallbackClassName="size-6"
                      alt=""
                    />
                    <span className="min-w-0 flex-1 truncate">{world.name}</span>
                    <WorldRoleBadge role="owner" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" onClick={() => setCreateOpen(true)}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">{t("createWorld")}</div>
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

      <WorldFormCredenza
        open={createOpen}
        onOpenChange={setCreateOpen}
        mode="create"
        onSubmit={handleCreate}
      />
    </>
  );
}
