import { createFileRoute } from "@tanstack/react-router";

import { WorldPermissionsPage } from "@/components/permissions/WorldPermissionsPage";
import { RequireWorldPermission } from "@/components/permissions/RequireWorldPermission";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId/permissions")({
  component: function WorldPermissionsRoute() {
    const { worldId } = Route.useParams();
    return (
      <RequireWorldPermission permission="permissions:manage">
        <WorldPermissionsPage worldId={worldId as Id<"worlds">} />
      </RequireWorldPermission>
    );
  },
});
