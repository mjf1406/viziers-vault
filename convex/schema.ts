/** @format */

import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
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
});

export default schema;
