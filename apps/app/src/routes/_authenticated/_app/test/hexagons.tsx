import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { HexGridForm } from "./-lib/HexGridForm";

export const Route = createFileRoute("/_authenticated/_app/test/hexagons")({
  component: function HexagonsPage() {
    const { t, i18n } = useTranslation("test");

    return (
      <div className="flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("hexagonsTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("hexagonsDescription")}</p>
        </div>
        <HexGridForm key={i18n.language} />
      </div>
    );
  },
});
