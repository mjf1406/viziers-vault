import { ConvexError } from "convex/values";

import type { Doc, Id } from "../_generated/dataModel.js";
import type { MutationCtx, QueryCtx } from "../_generated/server.js";
import { canOnWorld } from "./worldAccess.js";
import { canReadParty } from "./partyMembership.js";

/**
 * Load a file the caller owns. Uniform deny when missing or not owned.
 */
export async function requireFileOwner(
  ctx: Pick<QueryCtx | MutationCtx, "db">,
  fileId: Id<"files">,
  userId: Id<"users">,
): Promise<Doc<"files">> {
  const file = await ctx.db.get("files", fileId);
  if (!file || file.userId !== userId) {
    throw new ConvexError({
      code: "UPLOAD_FORBIDDEN",
      message: "File not found or access denied",
    });
  }
  return file;
}

/**
 * Whether the caller may read file bytes / metadata.
 * Owner always; otherwise scoped world `files:read` or party membership.
 */
export async function canAccessFile(
  ctx: QueryCtx | MutationCtx,
  file: Doc<"files">,
  userId: Id<"users">,
): Promise<boolean> {
  if (file.userId === userId) {
    return true;
  }
  if (file.worldId !== undefined) {
    return await canOnWorld(ctx, userId, file.worldId, "files:read");
  }
  if (file.partyId !== undefined) {
    return await canReadParty(ctx, file.partyId, userId);
  }
  if (file.classId !== undefined) {
    const world = await ctx.db
      .query("worlds")
      .withIndex("by_legacyClassId", (q) => q.eq("legacyClassId", file.classId!))
      .unique();
    if (world) {
      return await canOnWorld(ctx, userId, world._id, "files:read");
    }
  }
  return false;
}
