import { createFileRoute } from "@tanstack/react-router";

import { PartyConnectedWorldsPage } from "@/components/parties/PartyConnectedWorldsPage";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_party/party/$partyId/connected-worlds")({
  component: function PartyConnectedWorldsRoute() {
    const { partyId } = Route.useParams();
    return <PartyConnectedWorldsPage partyId={partyId as Id<"parties">} />;
  },
});
