import { createFileRoute } from "@tanstack/react-router";

import { PartyMembersPage } from "@/components/members/PartyMembersPage";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_party/party/$partyId/members")({
  component: function PartyMembersRoute() {
    const { partyId } = Route.useParams();
    return <PartyMembersPage partyId={partyId as Id<"parties">} />;
  },
});
