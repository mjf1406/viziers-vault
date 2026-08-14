import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { SelfHostUpdateBanner } from "@/components/classroom/SelfHostUpdateBanner";
import { AppFooter } from "@/components/navigation/AppFooter";
import { FeedbackNavButton } from "@/components/navigation/FeedbackNavButton";
import { PartyContent } from "@/components/navigation/party-sidebar/PartyContent";
import {
  PartyBreadcrumbSkeleton,
  PartySidebarSkeleton,
} from "@/components/navigation/party-sidebar/PartyLayoutSkeleton";
import { PartyAppSidebar } from "@/components/navigation/party-sidebar/PartySidebar";
import { PartyBreadcrumb } from "@/components/navigation/party-sidebar/PartyBreadcrumb";
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
import { useParty } from "@/hooks/parties/useParty";
import { useRemoveFileBytesOnAccessLoss } from "@/hooks/files/useFileBytes";
import type { Id } from "../../../../../../convex/_generated/dataModel";

export const Route = createFileRoute("/_authenticated/_party/party/$partyId")({
  component: function PartyLayout() {
    const { partyId: partyIdParam } = Route.useParams();
    const partyId = partyIdParam as Id<"parties">;
    const { data: partyDoc, isPending, isError, refetch } = useParty(partyId);
    const { t } = useTranslation("parties");
    const { t: tCommon } = useTranslation("common");
    const partyUnavailable = !isPending && (isError || !partyDoc);

    useRemoveFileBytesOnAccessLoss(partyUnavailable);

    if (partyUnavailable) {
      return (
        <div>
          <div className="flex min-h-svh flex-col">
            <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-8">
              <Empty card>
                <EmptyHeader>
                  <EmptyTitle>{t("partyNotFound")}</EmptyTitle>
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
      <SidebarProvider>
        {partyDoc ? <PartyAppSidebar partyDoc={partyDoc} /> : <PartySidebarSkeleton />}
        <SidebarInset>
          <div className="flex min-h-svh min-w-0 flex-col">
            <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="min-w-0 flex-1">
                {partyDoc ? <PartyBreadcrumb partyDoc={partyDoc} /> : <PartyBreadcrumbSkeleton />}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <FeedbackNavButton />
              </div>
            </header>
            <SelfHostUpdateBanner />
            <div className="flex min-w-0 flex-1 flex-col">
              <PartyContent partyPending={isPending || !partyDoc} />
            </div>
          </div>
          <AppFooter />
        </SidebarInset>
      </SidebarProvider>
    );
  },
});
