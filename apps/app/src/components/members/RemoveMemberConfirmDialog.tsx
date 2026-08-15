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

type RemoveMemberConfirmDialogProps = {
  open: boolean;
  memberName: string;
  namespace: "worlds" | "parties";
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function RemoveMemberConfirmDialog({
  open,
  memberName,
  namespace,
  onOpenChange,
  onConfirm,
}: RemoveMemberConfirmDialogProps) {
  const { t } = useTranslation(namespace);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("removeMemberConfirmTitle", { name: memberName })}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("removeMemberConfirmDescription", { name: memberName })}
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
            {t("removeMember")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
