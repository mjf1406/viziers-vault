import { createFileRoute } from "@tanstack/react-router";

import { WorldPartyGrantsPage } from "@/components/worlds/WorldPartyGrantsPage";
import { RequireWorldPermission } from "@/components/permissions/RequireWorldPermission";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId/parties-grants")({
  component: function WorldPartyGrantsRoute() {
    const { worldId } = Route.useParams();
    return (
      <RequireWorldPermission permission="parties:read">
        <WorldPartyGrantsPage worldId={worldId as Id<"worlds">} />
      </RequireWorldPermission>
    );
  },
});
