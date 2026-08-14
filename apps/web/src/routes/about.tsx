import { createFileRoute } from "@tanstack/react-router";

import { DisclosureSection } from "@/components/sections/disclosure";
import { NameExplanationSection } from "@/components/sections/name-explanation";
import { PhilosophySection } from "@/components/sections/philosophy";
import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => routeHead("/about"),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <NameExplanationSection />
      <PhilosophySection />
      <DisclosureSection />
    </>
  );
}
