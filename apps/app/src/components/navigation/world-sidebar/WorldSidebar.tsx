import type * as React from "react";

import { NavUser } from "@/components/navigation/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { WorldDoc } from "@/lib/worlds/worlds";
import { EntitySwitcher } from "@/components/navigation/EntitySwitcher";
import { WorldNavMain } from "./WorldMainNavLinks";

type WorldAppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  worldDoc: WorldDoc;
};

export function WorldAppSidebar({ worldDoc, ...props }: WorldAppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <EntitySwitcher current={{ kind: "world", world: worldDoc }} />
      </SidebarHeader>
      <SidebarContent>
        <WorldNavMain worldDoc={worldDoc} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
