import { createFileRoute } from "@tanstack/react-router";

import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/cookie-policy")({
  head: () => routeHead("/cookie-policy"),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
      <h1 className="text-3xl font-bold">Cookie Policy</h1>
      <p className="mt-6 text-muted-foreground">🚧UNDER CONSTRUCTION🚧</p>
    </section>
  );
}
