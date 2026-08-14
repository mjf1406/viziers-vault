import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CreateJoinCodeCredenza } from "@/components/invitations/CreateJoinCodeCredenza";
import { JoinCodeCard } from "@/components/invitations/JoinCodeCard";
import { CanWorld } from "@/components/permissions/CanWorld";
import { useWorldPermissionsContext } from "@/components/permissions/worldPermissionsContext";
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
import { useCreateWorldJoinCode } from "@/hooks/invitations/useCreateWorldJoinCode";
import { useRevokeJoinCode } from "@/hooks/invitations/useRevokeJoinCode";
import { useWorldJoinCodes } from "@/hooks/invitations/useWorldJoinCodes";
import {
  assignableWorldJoinCodeRoles,
  createWorldJoinCodeFormSchema,
  type CreateJoinCodeFormValues,
} from "@/lib/invitations/joinCodeFormSchema";
import type { JoinCodePublic } from "@/lib/invitations/joinCodes";
import type { WorldJoinCodeRole } from "@/lib/permissions/worldPermissions";
import type { Id } from "../../../convex/_generated/dataModel";

const LIST_NOW_REFRESH_MS = 30_000;

type WorldInvitationsPageProps = {
  worldId: Id<"worlds">;
  worldArchived: boolean;
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

export function WorldInvitationsPage({ worldId, worldArchived }: WorldInvitationsPageProps) {
  const { t } = useTranslation("worlds");
  const { can } = useWorldPermissionsContext();
  const [createOpen, setCreateOpen] = useState(false);
  const [listNow, setListNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setListNow(Date.now()), LIST_NOW_REFRESH_MS);
    return () => window.clearInterval(id);
  }, []);

  const { data, isPending, isError, refetch, isAuthLoading } = useWorldJoinCodes(worldId, listNow);
  const createMutation = useCreateWorldJoinCode(listNow);
  const revokeMutation = useRevokeJoinCode("worlds");

  const assignableRoles = useMemo(
    () => assignableWorldJoinCodeRoles(can) as Array<WorldJoinCodeRole>,
    [can],
  );
  const liveCodes = data ?? [];
  const showSkeleton = (isPending || isAuthLoading) && data == null;

  const handleCreate = useCallback(
    async (values: CreateJoinCodeFormValues) => {
      await createMutation.mutateAsync({
        worldId,
        role: values.role as WorldJoinCodeRole,
        ttlMs: values.ttlMs,
        maxUses: values.maxUses,
      });
    },
    [createMutation, worldId],
  );

  const handleRevoke = useCallback(
    (code: JoinCodePublic) => {
      void revokeMutation.mutateAsync({
        joinCodeId: code._id,
        listKey: { kind: "world", worldId, now: listNow },
      });
    },
    [listNow, revokeMutation, worldId],
  );

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("invitationsTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("invitationsDescription")}</p>
          {worldArchived ? (
            <p className="text-sm text-muted-foreground">{t("createInviteArchivedHint")}</p>
          ) : null}
        </div>
        <CanWorld permission="invitations:create">
          <Button
            type="button"
            disabled={worldArchived || assignableRoles.length === 0}
            onClick={() => setCreateOpen(true)}
          >
            <PlusIcon data-icon="inline-start" />
            {t("createInvite")}
          </Button>
        </CanWorld>
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
            <CanWorld permission="invitations:create">
              <Button
                type="button"
                disabled={worldArchived || assignableRoles.length === 0}
                onClick={() => setCreateOpen(true)}
              >
                <PlusIcon data-icon="inline-start" />
                {t("createInvite")}
              </Button>
            </CanWorld>
          </EmptyContent>
        </Empty>
      ) : null}

      {!showSkeleton && !isError && liveCodes.length > 0 ? (
        <div className="flex flex-col gap-3">
          {liveCodes.map((code) => (
            <JoinCodeCard
              key={code._id}
              code={code}
              classArchived={worldArchived}
              onRevoke={handleRevoke}
            />
          ))}
        </div>
      ) : null}

      <CreateJoinCodeCredenza
        open={createOpen}
        onOpenChange={setCreateOpen}
        assignableRoles={assignableRoles}
        namespace="worlds"
        schema={createWorldJoinCodeFormSchema}
        onSubmit={handleCreate}
      />
    </div>
  );
}
