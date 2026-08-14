import { createFileRoute } from "@tanstack/react-router";

import { WorldStaffPage } from "@/components/members/WorldStaffPage";
import { RequireWorldPermission } from "@/components/permissions/RequireWorldPermission";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute(
  "/_authenticated/_world/world/$worldId/assistant-game-masters",
)({
  component: function WorldAssistantGameMastersRoute() {
    const { worldId } = Route.useParams();
    return (
      <RequireWorldPermission permission="assistant_game_masters:read">
        <WorldStaffPage
          worldId={worldId as Id<"worlds">}
          role="assistant_game_master"
          titleKey="navAssistantGameMasters"
        />
      </RequireWorldPermission>
    );
  },
});
