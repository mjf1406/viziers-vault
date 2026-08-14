import { createFileRoute } from "@tanstack/react-router";

import { TeamSection } from "@/components/sections/team";
import { routeHead } from "@/lib/site";

export const Route = createFileRoute("/team")({
  head: () => routeHead("/team"),
  component: TeamPage,
});

function TeamPage() {
  return <TeamSection />;
}
