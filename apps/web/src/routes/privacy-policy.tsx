import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => routeHead("/privacy-policy"),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const { t } = useTranslation("legal");
  const { t: tCommon } = useTranslation("common");

  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <h1 className="text-3xl font-bold">{t("privacyTitle")}</h1>
      <p className="mt-6 text-muted-foreground">{tCommon("underConstruction")}</p>
    </section>
  );
}
