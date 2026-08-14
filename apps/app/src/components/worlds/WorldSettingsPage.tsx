import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { EntityIconDisplay } from "@/components/entities/EntityIconDisplay";
import {
  WorldFormCredenza,
  type WorldFormInitialValues,
} from "@/components/worlds/WorldFormCredenza";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateWorld } from "@/hooks/worlds/useUpdateWorld";
import { useWorld } from "@/hooks/worlds/useWorld";
import type { WorldFormValues } from "@/lib/worlds/worldFormSchema";
import { optionalFileId } from "@/lib/files/optionalFileId";
import type { Id } from "../../../convex/_generated/dataModel";

type WorldSettingsPageProps = {
  worldId: Id<"worlds">;
};

export function WorldSettingsPage({ worldId }: WorldSettingsPageProps) {
  const { t } = useTranslation("worlds");
  const { data: worldDoc, isPending, isError, refetch, isAuthLoading } = useWorld(worldId);
  const updateWorld = useUpdateWorld();
  const [editOpen, setEditOpen] = useState(false);

  const showSkeleton = (isPending || isAuthLoading) && worldDoc == null;

  const formInitialValues: WorldFormInitialValues | undefined = worldDoc
    ? {
        name: worldDoc.name,
        description: worldDoc.description,
        icon: worldDoc.icon,
        imageFileId: worldDoc.imageFileId,
      }
    : undefined;

  const handleSubmit = async (values: WorldFormValues) => {
    await updateWorld.mutateAsync({
      worldId,
      name: values.name,
      description: values.description,
      icon: values.icon,
      imageFileId: optionalFileId(values.imageFileId),
    });
  };

  if (showSkeleton) {
    return <Skeleton className="mx-4 mt-8 h-48 w-full max-w-2xl rounded-2xl" />;
  }

  if (isError || !worldDoc) {
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
            icon={worldDoc.icon}
            imageFileId={worldDoc.imageFileId}
            alt={worldDoc.name}
          />
          <div>
            <CardTitle>{worldDoc.name}</CardTitle>
            <CardDescription>{worldDoc.description ?? t("noDescription")}</CardDescription>
          </div>
        </CardHeader>
        <CardContent />
      </Card>

      <WorldFormCredenza
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
