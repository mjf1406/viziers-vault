import { createFileRoute } from "@tanstack/react-router";

import { FaqSection } from "@/components/sections/faq";
import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => routeHead("/faq"),
  component: FaqPage,
});

function FaqPage() {
  return <FaqSection />;
}
