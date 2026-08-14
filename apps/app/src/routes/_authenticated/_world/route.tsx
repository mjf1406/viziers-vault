import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_world")({
  component: function WorldGroupLayout() {
    return <Outlet />;
  },
});
