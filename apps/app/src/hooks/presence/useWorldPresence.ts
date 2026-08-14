import usePresence, { type PresenceState } from "@convex-dev/presence/react";

import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

/** 30s heartbeat → ~75s offline timeout (2.5× interval). */
export const WORLD_PRESENCE_HEARTBEAT_MS = 30_000;

/**
 * Live presence for a world room (`roomId` = worldId).
 */
export function useWorldPresence(
  worldId: Id<"worlds">,
  userId: Id<"users">,
): PresenceState[] | undefined {
  return usePresence(api.presence, worldId, userId, WORLD_PRESENCE_HEARTBEAT_MS);
}

export type { PresenceState };
