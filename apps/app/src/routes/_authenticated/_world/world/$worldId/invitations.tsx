import { createFileRoute } from "@tanstack/react-router";

import { WorldInvitationsPage } from "@/components/invitations/WorldInvitationsPage";
import { RequireWorldPermission } from "@/components/permissions/RequireWorldPermission";
import { useWorld } from "@/hooks/worlds/useWorld";
import { isWorldArchived } from "@/lib/worlds/worlds";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId/invitations")({
  component: function WorldInvitationsRoute() {
    const { worldId } = Route.useParams();
    const typedWorldId = worldId as Id<"worlds">;
    const { data: worldDoc } = useWorld(typedWorldId);

    return (
      <RequireWorldPermission permission="invitations:read">
        <WorldInvitationsPage
          worldId={typedWorldId}
          worldArchived={worldDoc ? isWorldArchived(worldDoc) : false}
        />
      </RequireWorldPermission>
    );
  },
});
