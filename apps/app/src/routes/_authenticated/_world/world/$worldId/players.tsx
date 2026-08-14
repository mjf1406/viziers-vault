import { createFileRoute } from "@tanstack/react-router";

import { WorldPlayersPage } from "@/components/members/WorldPlayersPage";
import { RequireWorldPermission } from "@/components/permissions/RequireWorldPermission";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId/players")({
  component: function WorldPlayersRoute() {
    const { worldId } = Route.useParams();
    return (
      <RequireWorldPermission permission="players:read">
        <WorldPlayersPage worldId={worldId as Id<"worlds">} />
      </RequireWorldPermission>
    );
  },
});
