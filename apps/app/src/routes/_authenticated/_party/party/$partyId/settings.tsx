import { createFileRoute } from "@tanstack/react-router";

import { PartySettingsPage } from "@/components/parties/PartySettingsPage";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_party/party/$partyId/settings")({
  component: function PartySettingsRoute() {
    const { partyId } = Route.useParams();
    return <PartySettingsPage partyId={partyId as Id<"parties">} />;
  },
});
