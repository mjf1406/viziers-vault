import { createFileRoute } from "@tanstack/react-router";

import { WorldSettingsPage } from "@/components/worlds/WorldSettingsPage";
import { RequireWorldPermission } from "@/components/permissions/RequireWorldPermission";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId/settings")({
  component: function WorldSettingsRoute() {
    const { worldId } = Route.useParams();
    return (
      <RequireWorldPermission permission="world:update">
        <WorldSettingsPage worldId={worldId as Id<"worlds">} />
      </RequireWorldPermission>
    );
  },
});
