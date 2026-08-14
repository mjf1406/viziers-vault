import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { TrialBanner } from "@/components/billing/TrialBanner";
import { SelfHostUpdateBanner } from "@/components/classroom/SelfHostUpdateBanner";
import { AppFooter } from "@/components/navigation/AppFooter";
import { FeedbackNavButton } from "@/components/navigation/FeedbackNavButton";
import { WorldContent } from "@/components/navigation/world-sidebar/WorldContent";
import {
  WorldBreadcrumbSkeleton,
  WorldSidebarSkeleton,
} from "@/components/navigation/world-sidebar/WorldLayoutSkeleton";
import { WorldAppSidebar } from "@/components/navigation/world-sidebar/WorldSidebar";
import { WorldBreadcrumb } from "@/components/navigation/world-sidebar/WorldBreadcrumb";
import { WorldPermissionsProvider } from "@/components/permissions/WorldPermissionsProvider";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useWorld } from "@/hooks/worlds/useWorld";
import { useRemoveFileBytesOnAccessLoss } from "@/hooks/files/useFileBytes";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId")({
  component: function WorldLayout() {
    const { worldId: worldIdParam } = Route.useParams();
    const worldId = worldIdParam as Id<"worlds">;
    const { data: worldDoc, isPending, isError, refetch } = useWorld(worldId);
    const { t } = useTranslation("worlds");
    const { t: tCommon } = useTranslation("common");
    const worldUnavailable = !isPending && (isError || !worldDoc);

    useRemoveFileBytesOnAccessLoss(worldUnavailable);

    if (worldUnavailable) {
      return (
        <div>
          <div className="flex min-h-svh flex-col">
            <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-8">
              <Empty card>
                <EmptyHeader>
                  <EmptyTitle>{t("worldNotFound")}</EmptyTitle>
                  <EmptyDescription>{tCommon("notFoundDescription")}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex flex-row justify-center gap-2">
                  <Button type="button" variant="outline" onClick={() => void refetch()}>
                    {tCommon("tryAgain")}
                  </Button>
                  <Button type="button" nativeButton={false} render={<Link to="/" />}>
                    {tCommon("goHome")}
                  </Button>
                </EmptyContent>
              </Empty>
            </main>
          </div>
          <AppFooter />
        </div>
      );
    }

    return (
      <WorldPermissionsProvider worldId={worldId}>
        <SidebarProvider>
          {worldDoc ? <WorldAppSidebar worldDoc={worldDoc} /> : <WorldSidebarSkeleton />}
          <SidebarInset>
            <div className="flex min-h-svh min-w-0 flex-col">
              <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-2 border-b bg-background px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="min-w-0 flex-1">
                  {worldDoc ? <WorldBreadcrumb worldDoc={worldDoc} /> : <WorldBreadcrumbSkeleton />}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <FeedbackNavButton />
                </div>
              </header>
              <SelfHostUpdateBanner />
              <TrialBanner />
              <div className="flex min-w-0 flex-1 flex-col">
                <WorldContent worldPending={isPending || !worldDoc} />
              </div>
            </div>
            <AppFooter />
          </SidebarInset>
        </SidebarProvider>
      </WorldPermissionsProvider>
    );
  },
});
