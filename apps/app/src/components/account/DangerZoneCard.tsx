import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { DeleteAccountCredenza } from "@/components/account/DeleteAccountCredenza";
import { DeletePartyCredenza } from "@/components/parties/DeletePartyCredenza";
import { DeleteWorldCredenza } from "@/components/worlds/DeleteWorldCredenza";
import { WorldTransferOwnershipCredenza } from "@/components/worlds/WorldTransferOwnershipCredenza";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteParty } from "@/hooks/parties/useDeleteParty";
import { useOwnedParties } from "@/hooks/parties/useOwnedParties";
import { useDeleteWorld } from "@/hooks/worlds/useDeleteWorld";
import { useOwnedWorlds } from "@/hooks/worlds/useOwnedWorlds";
import { useTransferWorldOwnership } from "@/hooks/worlds/useTransferOwnership";
import { useAccountDeletionBlockers } from "@/hooks/user/useAccountDeletionBlockers";
import { useDeleteAccount } from "@/hooks/user/useDeleteAccount";
import type { Id } from "../../../convex/_generated/dataModel";

type DangerZoneCardProps = {
  email: string | null | undefined;
};

type OwnedWorldAction = {
  worldId: Id<"worlds">;
  name: string;
  mode: "transfer" | "delete";
};

type OwnedPartyAction = {
  partyId: Id<"parties">;
  name: string;
};

export function DangerZoneCard({ email }: DangerZoneCardProps) {
  const { t } = useTranslation("account");
  const { t: tWorlds } = useTranslation("worlds");
  const { t: tParties } = useTranslation("parties");
  const [open, setOpen] = useState(false);
  const [worldAction, setWorldAction] = useState<OwnedWorldAction | null>(null);
  const [partyAction, setPartyAction] = useState<OwnedPartyAction | null>(null);
  const deleteAccount = useDeleteAccount();
  const deleteWorld = useDeleteWorld();
  const deleteParty = useDeleteParty();
  const transferWorldOwnership = useTransferWorldOwnership();
  const {
    data: blockers,
    isPending: blockersPending,
    isError: blockersError,
  } = useAccountDeletionBlockers();
  const { data: ownedWorlds = [] } = useOwnedWorlds();
  const { data: ownedParties = [] } = useOwnedParties();

  const blocked = (blockers?.length ?? 0) > 0;
  const ownsWorlds = blockers?.includes("owns_worlds") ?? false;
  const ownsParties = blockers?.includes("owns_parties") ?? false;
  const hasSubscription = blockers?.includes("active_subscription") ?? false;

  return (
    <>
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">{t("dangerTitle")}</CardTitle>
          <CardDescription>{t("dangerDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {blockersPending ? (
            <Skeleton className="h-16 w-full" />
          ) : blockersError ? (
            <p className="text-sm text-muted-foreground">{t("blockersLoadFailed")}</p>
          ) : blocked ? (
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{t("deleteBlockedTitle")}</p>
              {ownsWorlds ? (
                <div className="flex flex-col gap-2">
                  <p>
                    {ownedWorlds.length > 0
                      ? t("deleteBlockedOwnsWorldsCount", { count: ownedWorlds.length })
                      : t("deleteBlockedOwnsWorlds")}
                  </p>
                  {ownedWorlds.length > 0 ? (
                    <ul className="flex flex-col gap-2">
                      {ownedWorlds.map((world) => (
                        <li
                          key={world._id}
                          className="flex flex-col gap-2 rounded-md border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="font-medium text-foreground">{world.name}</span>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                setWorldAction({
                                  worldId: world._id,
                                  name: world.name,
                                  mode: "transfer",
                                })
                              }
                            >
                              {t("transferOwnership")}
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                              onClick={() =>
                                setWorldAction({
                                  worldId: world._id,
                                  name: world.name,
                                  mode: "delete",
                                })
                              }
                            >
                              {tWorlds("deleteAction")}
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Link to="/" className="underline underline-offset-2">
                      {t("deleteBlockedManageWorlds")}
                    </Link>
                  )}
                </div>
              ) : null}
              {ownsParties ? (
                <div className="flex flex-col gap-2">
                  <p>
                    {ownedParties.length > 0
                      ? t("deleteBlockedOwnsPartiesCount", { count: ownedParties.length })
                      : t("deleteBlockedOwnsParties")}
                  </p>
                  {ownedParties.length > 0 ? (
                    <ul className="flex flex-col gap-2">
                      {ownedParties.map((party) => (
                        <li
                          key={party._id}
                          className="flex flex-col gap-2 rounded-md border border-border p-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="font-medium text-foreground">{party.name}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                            onClick={() =>
                              setPartyAction({
                                partyId: party._id,
                                name: party.name,
                              })
                            }
                          >
                            {tParties("deleteAction")}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Link to="/" className="underline underline-offset-2">
                      {t("deleteBlockedManageParties")}
                    </Link>
                  )}
                </div>
              ) : null}
              {hasSubscription ? (
                <p>
                  {t("deleteBlockedActiveSubscription")}{" "}
                  <Link to="/billing" className="underline underline-offset-2">
                    {t("manageBilling")}
                  </Link>
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("deleteReadyBody")}</p>
          )}

          <Button
            type="button"
            variant="destructive"
            className="w-full justify-center bg-destructive text-white hover:bg-destructive/90 sm:w-auto dark:bg-destructive dark:hover:bg-destructive/90"
            disabled={blockersPending || blocked || deleteAccount.isPending}
            onClick={() => setOpen(true)}
          >
            {t("deleteAccount")}
          </Button>
        </CardContent>
      </Card>

      <DeleteAccountCredenza
        open={open}
        onOpenChange={setOpen}
        email={email}
        onConfirm={async (confirmation) => {
          await deleteAccount.mutateAsync({ confirmation });
        }}
      />

      {worldAction?.mode === "delete" ? (
        <DeleteWorldCredenza
          open
          onOpenChange={(next) => {
            if (!next) setWorldAction(null);
          }}
          entityName={worldAction.name}
          onConfirm={async (confirmation) => {
            await deleteWorld.mutateAsync({
              worldId: worldAction.worldId,
              confirmation,
            });
            setWorldAction(null);
          }}
        />
      ) : null}

      {worldAction?.mode === "transfer" ? (
        <WorldTransferOwnershipCredenza
          open
          onOpenChange={(next) => {
            if (!next) setWorldAction(null);
          }}
          worldId={worldAction.worldId}
          worldName={worldAction.name}
          onConfirm={async (toUserId) => {
            await transferWorldOwnership.mutateAsync({
              worldId: worldAction.worldId,
              toUserId,
            });
            setWorldAction(null);
          }}
        />
      ) : null}

      {partyAction ? (
        <DeletePartyCredenza
          open
          onOpenChange={(next) => {
            if (!next) setPartyAction(null);
          }}
          entityName={partyAction.name}
          onConfirm={async (confirmation) => {
            await deleteParty.mutateAsync({
              partyId: partyAction.partyId,
              confirmation,
            });
            setPartyAction(null);
          }}
        />
      ) : null}
    </>
  );
}
