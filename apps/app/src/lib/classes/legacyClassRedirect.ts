import type { WorldNavTo } from "@/lib/worlds/worldRoutes";

const LEGACY_REST_TO_WORLD: Record<string, WorldNavTo> = {
  "": "/world/$worldId",
  "/settings": "/world/$worldId/settings",
  "/permissions": "/world/$worldId/permissions",
  "/teachers": "/world/$worldId/game-masters",
  "/assistant-teachers": "/world/$worldId/assistant-game-masters",
  "/students": "/world/$worldId/players",
  "/guardians": "/world/$worldId",
  "/invitations": "/world/$worldId/invitations",
};

export function legacyClassSubpath(pathname: string, classId: string): string {
  const prefix = `/class/${classId}`;
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
    return "";
  }
  return pathname.slice(prefix.length);
}

export function worldNavFromLegacyClassPath(pathname: string, classId: string): WorldNavTo {
  const rest = legacyClassSubpath(pathname, classId);
  return LEGACY_REST_TO_WORLD[rest] ?? "/world/$worldId";
}
