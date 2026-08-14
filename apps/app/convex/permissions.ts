import { v } from "convex/values";

import { worldQuery } from "./lib/customFunctions.js";
import { permissionSnapshotForScope } from "./lib/permissionSnapshot.js";

const worldRoleValidator = v.union(
  v.literal("owner"),
  v.literal("game_master"),
  v.literal("assistant_game_master"),
  v.literal("player"),
  v.literal("world_member"),
);

export const forWorld = worldQuery({
  args: {},
  returns: v.object({
    role: v.union(worldRoleValidator, v.null()),
    permissions: v.array(v.string()),
  }),
  handler: async (ctx) => {
    return await permissionSnapshotForScope(ctx, ctx.userId, ctx.scope);
  },
});
