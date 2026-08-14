import { useNavigate } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { CanWorld } from "@/components/permissions/CanWorld";
import { PartyFormCredenza } from "@/components/parties/PartyFormCredenza";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { RevokePartyGrantConfirmDialog } from "@/components/worlds/RevokePartyGrantConfirmDialog";
import { useEntitlement } from "@/hooks/billing/useEntitlement";
import { useCreatePartyAndGrantWorldAccess } from "@/hooks/worldPartyGrants/useCreatePartyAndGrantWorldAccess";
import { useGrantPartyWorldAccess } from "@/hooks/worldPartyGrants/useGrantPartyWorldAccess";
import { useRevokePartyWorldGrant } from "@/hooks/worldPartyGrants/useRevokePartyWorldGrant";
import {
  useGrantablePartiesForWorld,
  useWorldPartyGrants,
} from "@/hooks/worldPartyGrants/useWorldPartyGrants";
import { optionalFileId } from "@/lib/files/optionalFileId";
import type { PartyFormValues } from "@/lib/parties/partyFormSchema";
import type { Id } from "../../../convex/_generated/dataModel";

type WorldPartyGrantsPageProps = {
  worldId: Id<"worlds">;
};

type GrantableParty = {
  _id: Id<"parties">;
  name: string;
};

type PartyOption = {
  value: Id<"parties">;
  label: string;
};

type PendingRevoke = {
  partyId: Id<"parties">;
  partyName: string;
};

export function WorldPartyGrantsPage({ worldId }: WorldPartyGrantsPageProps) {
  const { t } = useTranslation("worlds");
  const { t: tParties } = useTranslation("parties");
  const navigate = useNavigate();
  const { entitlement } = useEntitlement();
  const chipsAnchorRef = useRef<HTMLDivElement | null>(null);
  const [selectedParties, setSelectedParties] = useState<PartyOption[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [pendingRevoke, setPendingRevoke] = useState<PendingRevoke | null>(null);

  const grantsQuery = useWorldPartyGrants(worldId);
  const grantableQuery = useGrantablePartiesForWorld(worldId);
  const grantMutation = useGrantPartyWorldAccess();
  const createAndGrant = useCreatePartyAndGrantWorldAccess();
  const revokeMutation = useRevokePartyWorldGrant();

  const grants = grantsQuery.data ?? [];
  const grantable = (grantableQuery.data ?? []) as GrantableParty[];
  const grantedIds = new Set(grants.map((grant) => grant.partyId));
  const availableParties = grantable.filter((party) => !grantedIds.has(party._id));
  const partyOptions = useMemo(
    (): PartyOption[] =>
      availableParties.map((party) => ({
        value: party._id,
        label: party.name,
      })),
    [availableParties],
  );

  const isPending = grantsQuery.isPending || grantableQuery.isPending;
  const isError = grantsQuery.isError || grantableQuery.isError;

  const openCreateParty = () => {
    if (entitlement?.status === "expired") {
      void navigate({ to: "/billing" });
      return;
    }
    setCreateOpen(true);
  };

  const handleCreateParty = async (values: PartyFormValues) => {
    await createAndGrant.mutateAsync({
      worldId,
      name: values.name,
      description: values.description,
      icon: values.icon,
      imageFileId: optionalFileId(values.imageFileId),
    });
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("partiesGrantsTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("partiesGrantsDescription")}</p>
      </div>

      {isPending ? <Skeleton className="h-48 w-full rounded-2xl" /> : null}
      {!isPending && isError ? (
        <ErrorState
          title={t("partiesGrantsLoadFailed")}
          onRetry={() => {
            void grantsQuery.refetch();
            void grantableQuery.refetch();
          }}
        />
      ) : null}
      {!isPending && !isError ? (
        <>
          <CanWorld permission="parties:grant">
            <Card>
              <CardHeader>
                <CardTitle>{t("partiesGrantsTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="min-w-0 flex-1">
                  <Combobox
                    multiple
                    items={partyOptions}
                    value={selectedParties}
                    itemToStringLabel={(item) => item.label}
                    isItemEqualToValue={(a, b) => a.value === b.value}
                    onValueChange={(next) => setSelectedParties(next)}
                  >
                    <ComboboxChips ref={chipsAnchorRef} className="w-full">
                      <ComboboxValue>
                        {(values: PartyOption[]) =>
                          values.map((item) => (
                            <ComboboxChip key={item.value}>{item.label}</ComboboxChip>
                          ))
                        }
                      </ComboboxValue>
                      <ComboboxChipsInput
                        placeholder={
                          selectedParties.length === 0 ? t("selectPartyPlaceholder") : undefined
                        }
                        aria-label={t("selectPartyPlaceholder")}
                      />
                    </ComboboxChips>
                    <ComboboxContent anchor={chipsAnchorRef}>
                      <ComboboxEmpty>{t("selectPartyNoResults")}</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item.value} value={item}>
                            {item.label}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    disabled={selectedParties.length === 0 || grantMutation.isPending}
                    onClick={() => {
                      void grantMutation.mutateAsync({
                        worldId,
                        parties: selectedParties.map((party) => ({
                          _id: party.value,
                          name: party.label,
                        })),
                      });
                      setSelectedParties([]);
                    }}
                  >
                    {t("grantParty")}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={createAndGrant.isPending}
                    onClick={openCreateParty}
                  >
                    <PlusIcon data-icon="inline-start" />
                    {tParties("createParty")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CanWorld>

          <Card>
            <CardHeader>
              <CardTitle>{t("partiesGrantsTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              {grants.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyTitle>{t("partiesGrantsEmpty")}</EmptyTitle>
                    <EmptyDescription>{t("partiesGrantsDescription")}</EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <ul className="divide-y">
                  {grants.map((grant) => (
                    <li
                      key={grant._id}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="font-medium">{grant.partyName}</span>
                      <CanWorld permission="parties:revoke">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setPendingRevoke({
                              partyId: grant.partyId,
                              partyName: grant.partyName,
                            })
                          }
                        >
                          {t("revokePartyGrant")}
                        </Button>
                      </CanWorld>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      ) : null}

      <PartyFormCredenza
        open={createOpen}
        onOpenChange={setCreateOpen}
        mode="create"
        onSubmit={handleCreateParty}
      />
      <RevokePartyGrantConfirmDialog
        open={pendingRevoke !== null}
        partyName={pendingRevoke?.partyName ?? ""}
        onOpenChange={(open) => {
          if (!open) setPendingRevoke(null);
        }}
        onConfirm={() => {
          if (!pendingRevoke) return;
          const grant = pendingRevoke;
          setPendingRevoke(null);
          void revokeMutation.mutateAsync({ worldId, partyId: grant.partyId }).catch(() => {
            setPendingRevoke(grant);
          });
        }}
      />
    </div>
  );
}
