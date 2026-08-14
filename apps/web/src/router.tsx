import { createMemoryHistory, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export function createAppRouter(initialPath?: string) {
  return createRouter({
    routeTree,
    history: initialPath ? createMemoryHistory({ initialEntries: [initialPath] }) : undefined,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
