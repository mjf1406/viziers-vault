import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import {
  PartyFormCredenza,
  type PartyFormInitialValues,
} from "@/components/parties/PartyFormCredenza";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useParty } from "@/hooks/parties/useParty";
import { useUpdateParty } from "@/hooks/parties/useUpdateParty";
import type { PartyFormValues } from "@/lib/parties/partyFormSchema";
import { optionalFileId } from "@/lib/files/optionalFileId";
import type { Id } from "../../../convex/_generated/dataModel";

type PartySettingsPageProps = {
  partyId: Id<"parties">;
};

export function PartySettingsPage({ partyId }: PartySettingsPageProps) {
  const { t } = useTranslation("parties");
  const { data: partyDoc, isPending, isError, refetch, isAuthLoading } = useParty(partyId);
  const updateParty = useUpdateParty();
  const [editOpen, setEditOpen] = useState(false);

  const showSkeleton = (isPending || isAuthLoading) && partyDoc == null;

  const formInitialValues: PartyFormInitialValues | undefined = partyDoc
    ? {
        name: partyDoc.name,
        description: partyDoc.description,
        icon: partyDoc.icon,
        imageFileId: partyDoc.imageFileId,
      }
    : undefined;

  const handleSubmit = async (values: PartyFormValues) => {
    await updateParty.mutateAsync({
      partyId,
      name: values.name,
      description: values.description,
      icon: values.icon,
      imageFileId: optionalFileId(values.imageFileId),
    });
  };

  if (showSkeleton) {
    return <Skeleton className="mx-4 mt-8 h-48 w-full max-w-2xl rounded-2xl" />;
  }

  if (isError || !partyDoc) {
    return <ErrorState title={t("loadFailed")} onRetry={() => void refetch()} />;
  }

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("navSettings")}</h1>
          <p className="text-sm text-muted-foreground">{t("editDescription")}</p>
        </div>
        <Button type="button" variant="outline" onClick={() => setEditOpen(true)}>
          <PencilIcon data-icon="inline-start" />
          {t("editAction")}
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader className="flex flex-row items-start gap-3">
          <EntityIconDisplay
            icon={partyDoc.icon}
            imageFileId={partyDoc.imageFileId}
            alt={partyDoc.name}
          />
          <div>
            <CardTitle>{partyDoc.name}</CardTitle>
            <CardDescription>{partyDoc.description ?? t("noDescription")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent />
      </Card>

      <PartyFormCredenza
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
