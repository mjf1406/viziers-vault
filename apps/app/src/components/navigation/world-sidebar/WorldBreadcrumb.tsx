import { Link, useRouterState } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { WorldDoc } from "@/lib/worlds/worlds";

type WorldBreadcrumbProps = {
  worldDoc: WorldDoc;
};

function pageLabelKey(pathname: string, worldId: string): string {
  const base = `/world/${worldId}`;
  if (pathname === base || pathname === `${base}/`) return "navDashboard";
  if (pathname === `${base}/settings`) return "navSettings";
  if (pathname === `${base}/permissions`) return "navPermissions";
  if (pathname === `${base}/game-masters`) return "navGameMasters";
  if (pathname === `${base}/assistant-game-masters`) return "navAssistantGameMasters";
  if (pathname === `${base}/players`) return "navPlayers";
  if (pathname === `${base}/parties-grants`) return "navPartiesGrants";
  if (pathname === `${base}/invitations`) return "navInvitations";
  return "navDashboard";
}

export function WorldBreadcrumb({ worldDoc }: WorldBreadcrumbProps) {
  const { t } = useTranslation("worlds");
  const { t: tCommon } = useTranslation("common");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const pageKey = pageLabelKey(pathname, worldDoc._id);

  return (
    <Breadcrumb aria-label={t("breadcrumb")}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link to="/" />} aria-label={tCommon("goHome")}>
            <Home className="size-4" />
            <span className="sr-only">{tCommon("goHome")}</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link
                to="/world/$worldId"
                params={{ worldId: worldDoc._id }}
                className="max-w-40 truncate"
              />
            }
          >
            {worldDoc.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{t(pageKey)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
