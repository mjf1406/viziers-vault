import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
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
import { Input } from "@/components/ui/input";
import { deleteConfirmationPhrase } from "@/lib/parties/partyFormSchema";

type DeletePartyCredenzaProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityName: string;
  onConfirm: (confirmation: string) => Promise<void>;
};

export function DeletePartyCredenza({
  open,
  onOpenChange,
  entityName,
  onConfirm,
}: DeletePartyCredenzaProps) {
  const { t } = useTranslation("parties");
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expected = deleteConfirmationPhrase(entityName);
  const canDelete = confirmation === expected && !isSubmitting;

  useEffect(() => {
    if (!open) return;
    setConfirmation("");
    setIsSubmitting(false);
  }, [open, entityName]);

  const handleDelete = async () => {
    if (!canDelete) return;
    setIsSubmitting(true);
    onOpenChange(false);
    try {
      await onConfirm(expected);
    } catch {
      onOpenChange(true);
      setIsSubmitting(false);
    }
  };

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-md">
        <CredenzaHeader>
          <CredenzaTitle>{t("deleteTitle")}</CredenzaTitle>
          <CredenzaDescription className="sr-only">{t("deleteDescription")}</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            <Trans
              ns="parties"
              i18nKey="deleteWarning"
              values={{ name: entityName }}
              components={{
                bold: <span className="font-semibold text-foreground" />,
              }}
            />
          </p>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            <li>{t("deleteBulletMembers")}</li>
            <li>{t("deleteBulletSettings")}</li>
            <li>{t("deleteBulletContent")}</li>
          </ul>
          <p className="text-sm text-muted-foreground">{t("deletePermanentNote")}</p>

          <Field>
            <FieldLabel
              htmlFor="delete-party-confirmation"
              className="flex flex-wrap items-center gap-2"
            >
              <span>{t("deleteTypePrefix")}</span>
              <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-foreground">
                {expected}
                <CopyButton
                  type="text"
                  value={expected}
                  className="size-6"
                  aria-label={t("copyConfirmation")}
                />
              </span>
              <span>{t("deleteTypeSuffix")}</span>
            </FieldLabel>
            <Input
              id="delete-party-confirmation"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              placeholder={expected}
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
          </Field>
        </CredenzaBody>
        <CredenzaFooter className="flex-row justify-between gap-2">
          <CredenzaClose render={<Button type="button" variant="outline" className="flex-1" />}>
            {t("cancel")}
          </CredenzaClose>
          <Button
            type="button"
            variant="destructive"
            className="flex-1 bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
            disabled={!canDelete}
            onClick={() => {
              void handleDelete();
            }}
          >
            {t("deleteSubmit")}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
