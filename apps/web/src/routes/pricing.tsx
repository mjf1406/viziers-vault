import { createFileRoute } from "@tanstack/react-router";

import { PlanFeaturesSection } from "@/components/sections/plan-features";
import { PricingSection } from "@/components/sections/pricing";
import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/pricing")({
  head: () => routeHead("/pricing"),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PricingSection />
      <PlanFeaturesSection />
    </>
  );
}
