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
import type { PartyDoc } from "@/lib/parties/parties";

type PartyBreadcrumbProps = {
  partyDoc: PartyDoc;
};

function pageLabelKey(pathname: string, partyId: string): string {
  const base = `/party/${partyId}`;
  if (pathname === base || pathname === `${base}/`) return "navDashboard";
  if (pathname === `${base}/settings`) return "navSettings";
  if (pathname === `${base}/members`) return "navMembers";
  if (pathname === `${base}/invitations`) return "navInvitations";
  if (pathname === `${base}/connected-worlds`) return "navConnectedWorlds";
  return "navDashboard";
}

export function PartyBreadcrumb({ partyDoc }: PartyBreadcrumbProps) {
  const { t } = useTranslation("parties");
  const { t: tCommon } = useTranslation("common");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const pageKey = pageLabelKey(pathname, partyDoc._id);

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
                to="/party/$partyId"
                params={{ partyId: partyDoc._id }}
                className="max-w-40 truncate"
              />
            }
          >
            {partyDoc.name}
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
