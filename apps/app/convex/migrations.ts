import { Migrations } from "@convex-dev/migrations";
import { v } from "convex/values";

import { APP_CONFIG } from "./appConfig.js";
import { authz } from "./authz.js";
import { components, internal } from "./_generated/api.js";
import { internalMutation } from "./_generated/server.js";
import { type WorldRole, worldScope } from "./lib/authzModel.js";

function legacyClassScope(classId: string) {
  return { type: "class", id: classId } as const;
}

export const migrations = new Migrations(components.migrations, { internalMutation });
export const run = migrations.runner();

const CLASS_ROLE_TO_WORLD: Record<string, WorldRole> = {
  owner: "owner",
  teacher: "game_master",
  assistant_teacher: "assistant_game_master",
  student: "player",
  class_member: "world_member",
};

/**
 * Copy each legacy class into worlds and remap scoped authz roles to world scopes.
 * Idempotent: skips classes that already have a world with matching legacyClassId.
 */
export const migrateClassToWorld = migrations.define({
  table: "classes",
  migrateOne: async (ctx, classDoc) => {
    const existing = await ctx.db
      .query("worlds")
      .withIndex("by_legacyClassId", (q) => q.eq("legacyClassId", classDoc._id))
      .unique();
    if (existing) {
      return;
    }

    const now = Date.now();
    const worldId = await ctx.db.insert("worlds", {
      ownerId: classDoc.ownerId,
      name: classDoc.name,
      description: classDoc.description,
      icon: classDoc.icon,
      imageFileId: classDoc.bannerFileId,
      updatedAt: classDoc.updatedAt ?? now,
      archivedAt: classDoc.archivedAt,
      legacyClassId: classDoc._id,
    });

    const oldScope = legacyClassScope(classDoc._id);
    const newScope = worldScope(worldId);

    for (const [oldRole, newRole] of Object.entries(CLASS_ROLE_TO_WORLD)) {
      const users = await ctx.runQuery(components.authz.queries.getUsersWithRole, {
        tenantId: APP_CONFIG.authzTenantId,
        role: oldRole,
        scope: oldScope,
      });
      for (const entry of users) {
        await authz.assignRole(ctx, entry.userId, newRole, newScope);
        if (oldRole !== newRole) {
          await authz.revokeRole(
            ctx,
            entry.userId,
            oldRole as Parameters<typeof authz.revokeRole>[2],
            oldScope,
          );
        }
      }
    }

    // eslint-disable-next-line @convex-dev/no-collect-in-query -- class library bounded
    const files = await ctx.db
      .query("files")
      .withIndex("by_classId", (q) => q.eq("classId", classDoc._id))
      .collect();
    for (const file of files) {
      await ctx.db.patch("files", file._id, {
        worldId,
        classId: undefined,
      });
    }
  },
});

export const migrateAllClasses = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await ctx.scheduler.runAfter(0, internal.migrations.run, {
      fn: "migrateClassToWorld",
      batchSize: 50,
    });
    return null;
  },
});
