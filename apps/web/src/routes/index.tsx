import { createFileRoute } from "@tanstack/react-router";

// import { BenefitsSection } from "@/components/sections/benefits";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import { ToolsSection } from "@/components/sections/tools";
import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => routeHead("/"),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <FeaturesSection />
      {/* <BenefitsSection /> */}
    </>
  );
}
