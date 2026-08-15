import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CreateJoinCodeCredenza } from "@/components/invitations/CreateJoinCodeCredenza";
import { JoinCodeCard } from "@/components/invitations/JoinCodeCard";
import { RevokeInviteConfirmDialog } from "@/components/invitations/RevokeInviteConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreatePartyJoinCode } from "@/hooks/invitations/useCreatePartyJoinCode";
import { usePartyJoinCodes } from "@/hooks/invitations/usePartyJoinCodes";
import { useRevokeJoinCode } from "@/hooks/invitations/useRevokeJoinCode";
import {
  assignablePartyJoinCodeRoles,
  createPartyJoinCodeFormSchema,
  type CreateJoinCodeFormValues,
} from "@/lib/invitations/joinCodeFormSchema";
import { formatJoinCodeDisplay, type JoinCodePublic } from "@/lib/invitations/joinCodes";
import type { PartyJoinCodeRole } from "@/lib/permissions/worldPermissions";
import type { Id } from "../../../convex/_generated/dataModel";

const LIST_NOW_REFRESH_MS = 30_000;

type PartyInvitationsPageProps = {
  partyId: Id<"parties">;
  partyArchived: boolean;
};

function InvitationsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="h-36 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function PartyInvitationsPage({ partyId, partyArchived }: PartyInvitationsPageProps) {
  const { t } = useTranslation("parties");
  const [createOpen, setCreateOpen] = useState(false);
  const [pendingRevoke, setPendingRevoke] = useState<JoinCodePublic | null>(null);
  const [listNow, setListNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setListNow(Date.now()), LIST_NOW_REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  const { data, isPending, isError, refetch, isAuthLoading } = usePartyJoinCodes(partyId, listNow);
  const createMutation = useCreatePartyJoinCode(listNow);
  const revokeMutation = useRevokeJoinCode("parties");

  const assignableRoles = useMemo(() => assignablePartyJoinCodeRoles(), []);
  const liveCodes = data ?? [];
  const showSkeleton = (isPending || isAuthLoading) && data == null;

  const handleCreate = useCallback(
    async (values: CreateJoinCodeFormValues) => {
      await createMutation.mutateAsync({
        partyId,
        role: values.role as PartyJoinCodeRole,
        ttlMs: values.ttlMs,
        maxUses: values.maxUses,
      });
    },
    [createMutation, partyId],
  );

  const handleRevokeRequest = useCallback((code: JoinCodePublic) => {
    setPendingRevoke(code);
  }, []);

  const handleRevokeConfirm = useCallback(() => {
    if (!pendingRevoke) return;
    const code = pendingRevoke;
    setPendingRevoke(null);
    void revokeMutation
      .mutateAsync({
        joinCodeId: code._id,
        listKey: { kind: "party", partyId, now: listNow },
      })
      .catch(() => {
        setPendingRevoke(code);
      });
  }, [listNow, partyId, pendingRevoke, revokeMutation]);

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("invitationsTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("invitationsDescription")}</p>
          {partyArchived ? (
            <p className="text-sm text-muted-foreground">{t("createInviteArchivedHint")}</p>
          ) : null}
        </div>
        <Button type="button" disabled={partyArchived} onClick={() => setCreateOpen(true)}>
          <PlusIcon data-icon="inline-start" />
          {t("createInvite")}
        </Button>
      </div>

      {showSkeleton ? <InvitationsSkeleton /> : null}
      {!showSkeleton && isError ? (
        <ErrorState title={t("invitationsLoadFailed")} onRetry={() => void refetch()} />
      ) : null}
      {!showSkeleton && !isError && liveCodes.length === 0 ? (
        <Empty card>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PlusIcon />
            </EmptyMedia>
            <EmptyTitle>{t("invitationsEmptyTitle")}</EmptyTitle>
            <EmptyDescription>{t("invitationsEmptyDescription")}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" disabled={partyArchived} onClick={() => setCreateOpen(true)}>
              <PlusIcon data-icon="inline-start" />
              {t("createInvite")}
            </Button>
          </EmptyContent>
        </Empty>
      ) : null}

      {!showSkeleton && !isError && liveCodes.length > 0 ? (
        <div className="flex flex-col gap-3">
          {liveCodes.map((code) => (
            <JoinCodeCard
              key={code._id}
              code={code}
              classArchived={partyArchived}
              namespace="parties"
              onRevoke={handleRevokeRequest}
            />
          ))}
        </div>
      ) : null}

      <CreateJoinCodeCredenza
        open={createOpen}
        onOpenChange={setCreateOpen}
        assignableRoles={assignableRoles}
        namespace="parties"
        schema={createPartyJoinCodeFormSchema}
        onSubmit={handleCreate}
      />
      <RevokeInviteConfirmDialog
        open={pendingRevoke !== null}
        code={pendingRevoke ? formatJoinCodeDisplay(pendingRevoke.code) : ""}
        namespace="parties"
        onOpenChange={(open) => {
          if (!open) setPendingRevoke(null);
        }}
        onConfirm={handleRevokeConfirm}
      />
    </div>
  );
}
