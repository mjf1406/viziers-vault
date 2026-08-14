import { Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { getPageMeta, routeHead } from "@/lib/site";

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">That page does not exist on Vizier&apos;s Vault.</p>
      <Link to="/" className="mt-8 inline-block text-primary underline">
        Back home
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    document.title = getPageMeta(pathname).title;
  }, [pathname]);
  return null;
}

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system">
      <DocumentTitle />
      <SiteNavbar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </ThemeProvider>
  );
}
