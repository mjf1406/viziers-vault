import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { routeHead } from "@/lib/site";

const META_TITLE_KEYS: Record<string, string> = {
  "/": "homeTitle",
  "/about": "aboutTitle",
  "/pricing": "pricingTitle",
  "/faq": "faqTitle",
  "/contact": "contactTitle",
  "/privacy-policy": "privacyTitle",
  "/terms-of-service": "termsTitle",
  "/cookie-policy": "cookieTitle",
  "/404": "notFoundTitle",
};

function NotFound() {
  const { t } = useTranslation("common");

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">{t("notFoundTitle")}</h1>
      <p className="mt-4 text-muted-foreground">{t("notFoundDescription")}</p>
      <Link to="/" className="mt-8 inline-block text-primary underline">
        {t("backHome")}
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => routeHead("/"),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function DocumentTitle() {
  const { t, i18n } = useTranslation("meta");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const key = META_TITLE_KEYS[pathname] ?? "homeTitle";
    document.title = t(key);
  }, [pathname, t, i18n.language]);

  return null;
}

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system">
      <LanguageProvider>
        <DocumentTitle />
        <SiteNavbar />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </LanguageProvider>
    </ThemeProvider>
  );
}
