/** @format */

import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    /* ----------------------
            Parties
    ---------------------- */
    parties: defineTable({
        name: v.string(),
        levels: v.array(
            v.object({
                level: v.number(),
                quantity: v.number(),
            })
        ),
        userId: v.id("users"),
    }).index("by_user", ["userId"]),
    /* ----------------------
            Worlds
    ---------------------- */
    worlds: defineTable({
        name: v.string(),
        description: v.string(),
        setting: v.string(), // "Fantasy", "Sci-Fi", "Modern", "Historical", etc.
        locations: v.array(
            v.object({
                name: v.string(),
                type: v.string(), // "City", "Dungeon", "Wilderness", etc.
                description: v.string(),
            })
        ),
        userId: v.id("users"),
    }).index("by_user", ["userId"]),
});

export default schema;
