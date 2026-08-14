import type { Doc, Id } from "../../_generated/dataModel.js";
import type { MutationCtx } from "../../_generated/server.js";
import {
  normalizeEntityDescription,
  normalizeEntityName,
  normalizeVisualFields,
} from "../entityVisual.js";

export async function insertOwnedParty(
  ctx: MutationCtx,
  userId: Id<"users">,
  args: {
    name: string;
    description?: string;
    icon?: string;
    imageFileId?: Id<"files">;
  },
): Promise<Doc<"parties">> {
  const visual = normalizeVisualFields({
    icon: args.icon,
    imageFileId: args.imageFileId,
  });
  const now = Date.now();
  const partyId = await ctx.db.insert("parties", {
    ownerId: userId,
    name: normalizeEntityName(args.name),
    description: normalizeEntityDescription(args.description),
    icon: visual.icon,
    imageFileId: visual.imageFileId as Id<"files"> | undefined,
    updatedAt: now,
  });
  const created = await ctx.db.get("parties", partyId);
  if (!created) {
    throw new Error("Failed to create party");
  }
  return created;
}
