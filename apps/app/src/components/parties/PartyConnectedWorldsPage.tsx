import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
  const { t: tWorlds } = useTranslation("worlds");
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

      {!grantsQuery.isPending && !grantsQuery.isError && grants.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {grants.map((grant) => (
            <Card
              key={grant._id}
              size="sm"
              className="relative transition-colors hover:bg-accent/40"
            >
              <Link
                to="/world/$worldId"
                params={{ worldId: grant.worldId }}
                className="absolute inset-0 z-0 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={tWorlds("openWorld", { name: grant.worldName })}
              />
              <CardHeader className="relative z-10 flex flex-row items-start gap-3 pointer-events-none">
                <EntityIconDisplay
                  icon={grant.worldIcon}
                  imageFileId={grant.worldImageFileId}
                  alt={grant.worldName}
                />
                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-base font-semibold">
                    {grant.worldName}
                  </CardTitle>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
