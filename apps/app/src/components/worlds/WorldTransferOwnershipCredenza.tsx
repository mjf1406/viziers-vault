import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useEligibleWorldOwners } from "@/hooks/worlds/useEligibleOwners";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import type { FunctionReturnType } from "convex/server";

type WorldTransferOwnershipCredenzaProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worldId: Id<"worlds">;
  worldName: string;
  onConfirm: (toUserId: Id<"users">) => Promise<void>;
};

export function WorldTransferOwnershipCredenza({
  open,
  onOpenChange,
  worldId,
  worldName,
  onConfirm,
}: WorldTransferOwnershipCredenzaProps) {
  const { t } = useTranslation("worlds");
  const { t: tAccount } = useTranslation("account");
  const { data: candidates, isPending, isError } = useEligibleWorldOwners(worldId);
  type EligibleOwner = FunctionReturnType<typeof api.worlds.eligibleOwners>[number];
  const [toUserId, setToUserId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setToUserId("");
    setIsSubmitting(false);
  }, [open, worldId]);

  const canTransfer = Boolean(toUserId) && !isSubmitting;

  const handleTransfer = async () => {
    if (!toUserId || !canTransfer) return;
    setIsSubmitting(true);
    onOpenChange(false);
    try {
      await onConfirm(toUserId as Id<"users">);
    } catch {
      onOpenChange(true);
      setIsSubmitting(false);
    }
  };

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-md">
        <CredenzaHeader>
          <CredenzaTitle>{t("transferTitle")}</CredenzaTitle>
          <CredenzaDescription>{t("transferDescription", { name: worldName })}</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{t("transferBody")}</p>
          <p className="text-sm text-muted-foreground">{t("transferDemotionNote")}</p>
          {isPending ? (
            <Skeleton className="h-10 w-full" />
          ) : isError ? (
            <p className="text-sm text-muted-foreground">{t("transferLoadFailed")}</p>
          ) : !candidates?.length ? (
            <p className="text-sm text-muted-foreground">{t("transferNoCandidates")}</p>
          ) : (
            <Field>
              <FieldLabel htmlFor="transfer-owner">{t("transferRecipientLabel")}</FieldLabel>
              <Select
                value={toUserId || null}
                onValueChange={(next) => {
                  if (next) setToUserId(next);
                }}
              >
                <SelectTrigger id="transfer-owner" className="w-full">
                  <SelectValue placeholder={t("transferRecipientPlaceholder")}>
                    {(() => {
                      const selected = candidates.find(
                        (entry: EligibleOwner) => entry.userId === toUserId,
                      );
                      if (!selected) return null;
                      return selected.name ?? selected.email ?? selected.userId;
                    })()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {candidates.map((entry: EligibleOwner) => (
                      <SelectItem key={entry.userId} value={entry.userId}>
                        {entry.name ?? entry.email ?? entry.userId}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        </CredenzaBody>
        <CredenzaFooter className="flex-row justify-between gap-2">
          <CredenzaClose render={<Button type="button" variant="outline" className="flex-1" />}>
            {tAccount("cancel")}
          </CredenzaClose>
          <Button
            type="button"
            className="flex-1"
            disabled={!canTransfer || !candidates?.length}
            onClick={() => {
              void handleTransfer();
            }}
          >
            {t("transferSubmit")}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
