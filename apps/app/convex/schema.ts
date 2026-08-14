import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { languageValidator } from "./lib/languages.js";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    avatarFileId: v.optional(v.id("files")),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
  userSettings: defineTable({
    userId: v.id("users"),
    language: languageValidator,
  }).index("by_userId", ["userId"]),
  worlds: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageFileId: v.optional(v.id("files")),
    updatedAt: v.number(),
    archivedAt: v.optional(v.number()),
    /** Set during class→world migration for legacy URL redirects. */
    legacyClassId: v.optional(v.id("classes")),
  })
    .index("by_owner", ["ownerId"])
    .index("by_legacyClassId", ["legacyClassId"]),
  parties: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageFileId: v.optional(v.id("files")),
    updatedAt: v.number(),
    archivedAt: v.optional(v.number()),
  }).index("by_owner", ["ownerId"]),
  partyMemberships: defineTable({
    partyId: v.id("parties"),
    userId: v.id("users"),
    role: v.union(v.literal("leader"), v.literal("member")),
    createdAt: v.number(),
  })
    .index("by_party", ["partyId"])
    .index("by_party_and_user", ["partyId", "userId"])
    .index("by_user", ["userId"])
    .index("by_party_and_role", ["partyId", "role"]),
  worldPartyGrants: defineTable({
    worldId: v.id("worlds"),
    partyId: v.id("parties"),
    grantedBy: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_world", ["worldId"])
    .index("by_party", ["partyId"])
    .index("by_world_and_party", ["worldId", "partyId"]),
  /** Legacy classroom table — retained for migration and redirects. */
  classes: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    year: v.number(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    bannerFileId: v.optional(v.id("files")),
    updatedAt: v.number(),
    archivedAt: v.optional(v.number()),
  }).index("by_owner", ["ownerId"]),
  joinCodes: defineTable({
    code: v.string(),
    targetKind: v.union(v.literal("world"), v.literal("party"), v.literal("class")),
    worldId: v.optional(v.id("worlds")),
    partyId: v.optional(v.id("parties")),
    /** @deprecated legacy class invites */
    classId: v.optional(v.id("classes")),
    createdBy: v.id("users"),
    role: v.string(),
    expiresAt: v.number(),
    maxUses: v.number(),
    useCount: v.number(),
    expirationJobId: v.optional(v.id("_scheduled_functions")),
  })
    .index("by_code", ["code"])
    .index("by_world", ["worldId"])
    .index("by_party", ["partyId"])
    .index("by_class", ["classId"])
    .index("by_creator", ["createdBy"]),
  trialGrants: defineTable({
    emailKey: v.string(),
    userId: v.optional(v.id("users")),
    startedAt: v.number(),
    endsAt: v.number(),
    expiredAt: v.optional(v.number()),
    expirationJobId: v.optional(v.id("_scheduled_functions")),
  })
    .index("by_emailKey", ["emailKey"])
    .index("by_userId", ["userId"])
    .index("by_endsAt", ["endsAt"]),
  files: defineTable({
    storageId: v.id("_storage"),
    userId: v.id("users"),
    worldId: v.optional(v.id("worlds")),
    partyId: v.optional(v.id("parties")),
    /** @deprecated migrated to worldId */
    classId: v.optional(v.id("classes")),
    name: v.string(),
    contentType: v.string(),
    size: v.number(),
    preset: v.string(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_storageId", ["storageId"])
    .index("by_worldId", ["worldId"])
    .index("by_partyId", ["partyId"])
    .index("by_classId", ["classId"]),
  guardianStudentLinks: defineTable({
    classId: v.id("classes"),
    guardianUserId: v.id("users"),
    studentUserId: v.id("users"),
    createdAt: v.number(),
    createdBy: v.id("users"),
  })
    .index("by_class_guardian", ["classId", "guardianUserId"])
    .index("by_class_student", ["classId", "studentUserId"])
    .index("by_class_guardian_student", ["classId", "guardianUserId", "studentUserId"]),
  anonymousUsageEvents: defineTable({
    kind: v.union(v.literal("desktop_download"), v.literal("self_host_click")),
    os: v.optional(v.union(v.literal("windows"), v.literal("mac"), v.literal("ubuntu"))),
  }),
  githubCloneDays: defineTable({
    dayKey: v.string(),
    dayStartMs: v.number(),
    rawCount: v.number(),
    ciSubtracted: v.number(),
    count: v.number(),
    uniques: v.number(),
    syncedAt: v.number(),
  }).index("by_dayKey", ["dayKey"]),
  feedback: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("bug"), v.literal("feature"), v.literal("concern"), v.literal("other")),
    title: v.string(),
    body: v.string(),
    stepsToReproduce: v.optional(v.string()),
    expected: v.optional(v.string()),
    actual: v.optional(v.string()),
    severity: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    useCase: v.optional(v.string()),
    proposedSolution: v.optional(v.string()),
    importance: v.optional(
      v.union(v.literal("nice"), v.literal("important"), v.literal("critical")),
    ),
    impact: v.optional(v.string()),
    wantReply: v.boolean(),
    attachmentFileIds: v.array(v.id("files")),
    createdAt: v.number(),
    archivedAt: v.optional(v.number()),
    isSeed: v.optional(v.boolean()),
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_userId", ["userId"])
    .index("by_isSeed", ["isSeed"]),
});

export default schema;
