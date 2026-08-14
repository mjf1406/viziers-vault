import type * as React from "react";

import { NavUser } from "@/components/navigation/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { PartyDoc } from "@/lib/parties/parties";
import { PartySwitcher } from "./PartySwitcher";
import { PartyNavMain } from "./PartyMainNavLinks";

type PartyAppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  partyDoc: PartyDoc;
};

export function PartyAppSidebar({ partyDoc, ...props }: PartyAppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <PartySwitcher currentParty={partyDoc} />
      </SidebarHeader>
      <SidebarContent>
        <PartyNavMain partyDoc={partyDoc} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
