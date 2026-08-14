import { createFileRoute } from "@tanstack/react-router";

import { LegacyClassRedirect } from "@/components/classes/LegacyClassRedirect";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_class/class/$classId/assistant-teachers")({
  component: function ClassLegacyAssistantTeachersRedirect() {
    const { classId } = Route.useParams();
    return <LegacyClassRedirect classId={classId as Id<"classes">} />;
  },
});
