import { createFileRoute } from "@tanstack/react-router";

import { WorldStaffPage } from "@/components/members/WorldStaffPage";
import { RequireWorldPermission } from "@/components/permissions/RequireWorldPermission";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId/game-masters")({
  component: function WorldGameMastersRoute() {
    const { worldId } = Route.useParams();
    return (
      <RequireWorldPermission permission="game_masters:read">
        <WorldStaffPage
          worldId={worldId as Id<"worlds">}
          role="game_master"
          titleKey="navGameMasters"
        />
      </RequireWorldPermission>
    );
  },
});
