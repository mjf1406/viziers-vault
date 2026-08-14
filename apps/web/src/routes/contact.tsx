import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/sections/contact";
import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => routeHead("/contact"),
  component: ContactPage,
});

function ContactPage() {
  return <ContactSection />;
}
