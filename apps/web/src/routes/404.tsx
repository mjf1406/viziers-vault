import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/404")({
  head: () => routeHead("/404"),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 sm:py-32">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">That page does not exist on Vizier&apos;s Vault.</p>
      <Link to="/" className="mt-8 inline-block text-primary underline">
        Back home
      </Link>
    </section>
  );
}
