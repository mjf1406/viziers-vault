import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type RevokePartyGrantConfirmDialogProps = {
  open: boolean;
  partyName: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function RevokePartyGrantConfirmDialog({
  open,
  partyName,
  onOpenChange,
  onConfirm,
}: RevokePartyGrantConfirmDialogProps) {
  const { t } = useTranslation("worlds");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("revokePartyGrantConfirmTitle", { name: partyName })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("revokePartyGrantConfirmDescription", { name: partyName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              onConfirm();
            }}
          >
            {t("revokePartyGrant")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
