import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { usePartyWorldGrants } from "@/hooks/worldPartyGrants/usePartyWorldGrants";
import type { Id } from "../../../convex/_generated/dataModel";

type PartyConnectedWorldsPageProps = {
  partyId: Id<"parties">;
};

export function PartyConnectedWorldsPage({ partyId }: PartyConnectedWorldsPageProps) {
  const { t } = useTranslation("parties");
  const grantsQuery = usePartyWorldGrants(partyId);
  const grants = grantsQuery.data ?? [];

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("connectedWorldsTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("connectedWorldsDescription")}</p>
      </div>

      {grantsQuery.isPending ? <Skeleton className="h-32 w-full rounded-2xl" /> : null}
      {grantsQuery.isError ? (
        <ErrorState
          title={t("connectedWorldsLoadFailed")}
          onRetry={() => void grantsQuery.refetch()}
        />
      ) : null}

      {!grantsQuery.isPending && !grantsQuery.isError && grants.length === 0 ? (
        <Empty card>
          <EmptyHeader>
            <EmptyTitle>{t("connectedWorldsEmpty")}</EmptyTitle>
            <EmptyDescription>{t("connectedWorldsDescription")}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {grants.map((grant) => (
          <Card key={grant._id} size="sm">
            <CardHeader>
              <CardTitle className="text-base">{grant.worldName}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link to="/world/$worldId" params={{ worldId: grant.worldId }} />}
              >
                {grant.worldName}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
