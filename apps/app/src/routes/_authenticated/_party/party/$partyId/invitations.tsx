import { createFileRoute } from "@tanstack/react-router";

import { PartyInvitationsPage } from "@/components/invitations/PartyInvitationsPage";
import { useParty } from "@/hooks/parties/useParty";
import { isPartyArchived } from "@/lib/parties/parties";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_party/party/$partyId/invitations")({
  component: function PartyInvitationsRoute() {
    const { partyId } = Route.useParams();
    const typedPartyId = partyId as Id<"parties">;
    const { data: partyDoc } = useParty(typedPartyId);

    return (
      <PartyInvitationsPage
        partyId={typedPartyId}
        partyArchived={partyDoc ? isPartyArchived(partyDoc) : false}
      />
    );
  },
});
