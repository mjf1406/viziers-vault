import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import PendingComponent from "@/components/loading/PendingComponent";
import { useWorldCan } from "@/hooks/permissions/useWorldCan";
import type { WorldPermission } from "@/lib/permissions/worldPermissions";

type RequireWorldPermissionProps = {
  permission: WorldPermission;
  children: ReactNode;
};

export function RequireWorldPermission({ permission, children }: RequireWorldPermissionProps) {
  const { can, isPending } = useWorldCan();
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");

  if (isPending) {
    return <PendingComponent />;
  }

  if (!can(permission)) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 py-8">
        <Empty card>
          <EmptyHeader>
            <EmptyTitle>{t("worldNotFound")}</EmptyTitle>
            <EmptyDescription>{tCommon("notFoundDescription")}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex flex-row justify-center gap-2">
            <Button type="button" nativeButton={false} render={<Link to="/" />}>
              {tCommon("goHome")}
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    );
  }

  return children;
}
