import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_authenticated/_world/world/$worldId/")({
  component: function WorldDashboardPage() {
    const { t } = useTranslation("worlds");
    return (
      <main className="flex w-full flex-col gap-6 px-4 py-8 sm:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("navDashboard")}</h1>
          <p className="text-sm text-muted-foreground">{t("comingSoon")}</p>
        </div>
      </main>
    );
  },
});
