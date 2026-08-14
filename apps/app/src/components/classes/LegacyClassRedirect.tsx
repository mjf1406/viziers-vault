import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import PendingComponent from "@/components/loading/PendingComponent";
import { AppFooter } from "@/components/navigation/AppFooter";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useWorldByLegacyClassId } from "@/hooks/worlds/useWorld";
import { worldNavFromLegacyClassPath } from "@/lib/classes/legacyClassRedirect";
import type { Id } from "../../../convex/_generated/dataModel";

type LegacyClassRedirectProps = {
  classId: Id<"classes">;
};

export function LegacyClassRedirect({ classId }: LegacyClassRedirectProps) {
  const { t } = useTranslation("classes");
  const { t: tCommon } = useTranslation("common");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { data: world, isPending, isError, refetch } = useWorldByLegacyClassId(classId);

  if (isPending) {
    return <PendingComponent />;
  }

  if (isError || !world) {
    return (
      <div>
        <div className="flex min-h-svh flex-col">
          <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-8">
            <Empty card>
              <EmptyHeader>
                <EmptyTitle>{t("classNotFound")}</EmptyTitle>
                <EmptyDescription>{tCommon("notFoundDescription")}</EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex flex-row justify-center gap-2">
                <Button type="button" variant="outline" onClick={() => void refetch()}>
                  {tCommon("tryAgain")}
                </Button>
                <Button type="button" nativeButton={false} render={<Link to="/" />}>
                  {tCommon("goHome")}
                </Button>
              </EmptyContent>
            </Empty>
          </main>
        </div>
        <AppFooter />
      </div>
    );
  }

  const to = worldNavFromLegacyClassPath(pathname, classId);
  return <Navigate to={to} params={{ worldId: world._id }} replace />;
}
