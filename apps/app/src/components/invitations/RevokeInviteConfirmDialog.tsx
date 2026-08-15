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

type RevokeInviteConfirmDialogProps = {
  open: boolean;
  code: string;
  namespace: "worlds" | "parties";
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function RevokeInviteConfirmDialog({
  open,
  code,
  namespace,
  onOpenChange,
  onConfirm,
}: RevokeInviteConfirmDialogProps) {
  const { t } = useTranslation(namespace);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("revokeInviteConfirmTitle", { code })}</AlertDialogTitle>
          <AlertDialogDescription>{t("revokeInviteConfirmDescription")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              onConfirm();
            }}
          >
            {t("revokeInvite")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
