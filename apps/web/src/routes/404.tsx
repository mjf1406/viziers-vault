import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/404")({
  head: () => routeHead("/404"),
  component: NotFoundPage,
});

function NotFoundPage() {
  const { t } = useTranslation("common");

  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 sm:py-32">
      <h1 className="text-3xl font-bold">{t("notFoundTitle")}</h1>
      <p className="mt-4 text-muted-foreground">{t("notFoundDescription")}</p>
      <Link to="/" className="mt-8 inline-block text-primary underline">
        {t("backHome")}
      </Link>
    </section>
  );
}
