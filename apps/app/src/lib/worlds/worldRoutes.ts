import type { Id } from "../../../convex/_generated/dataModel";

export type WorldNavTo =
  | "/world/$worldId"
  | "/world/$worldId/settings"
  | "/world/$worldId/permissions"
  | "/world/$worldId/game-masters"
  | "/world/$worldId/assistant-game-masters"
  | "/world/$worldId/players"
  | "/world/$worldId/parties-grants"
  | "/world/$worldId/invitations";

export function worldPathFor(to: WorldNavTo, worldId: Id<"worlds">): string {
  return to.replace("$worldId", worldId);
}

const REST_TO_ROUTE: Record<string, WorldNavTo> = {
  "": "/world/$worldId",
  "/settings": "/world/$worldId/settings",
  "/permissions": "/world/$worldId/permissions",
  "/game-masters": "/world/$worldId/game-masters",
  "/assistant-game-masters": "/world/$worldId/assistant-game-masters",
  "/players": "/world/$worldId/players",
  "/parties-grants": "/world/$worldId/parties-grants",
  "/invitations": "/world/$worldId/invitations",
};

export function worldRouteFromPathname(pathname: string, worldId: string): WorldNavTo {
  const prefix = `/world/${worldId}`;
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
    return "/world/$worldId";
  }
  const rest = pathname.slice(prefix.length);
  return REST_TO_ROUTE[rest] ?? "/world/$worldId";
}
