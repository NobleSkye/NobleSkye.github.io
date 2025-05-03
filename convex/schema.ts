import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  boards: defineTable({
    name: v.string(),
    elements: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        x: v.number(),
        y: v.number(),
        width: v.number(),
        height: v.number(),
        angle: v.number(),
        strokeColor: v.string(),
        backgroundColor: v.string(),
        fillStyle: v.string(),
        strokeWidth: v.number(),
        roughness: v.number(),
        opacity: v.number(),
        text: v.optional(v.string()),
        font: v.optional(v.string()),
        fontSize: v.optional(v.number()),
        textAlign: v.optional(v.string()),
        locked: v.boolean(),
        visible: v.boolean(),
        version: v.number(),
        isDeleted: v.boolean(),
        lastModifiedBy: v.optional(v.id("users")),
      })
    ),
    viewState: v.object({
      scrollX: v.number(),
      scrollY: v.number(),
      zoom: v.number(),
    }),
    collaborators: v.array(v.id("users")),
    owner: v.id("users"),
    isPublic: v.boolean(),
    lastModified: v.number(),
  }).index("by_owner", ["owner"]),

  libraries: defineTable({
    name: v.string(),
    elements: v.array(
      v.object({
        id: v.string(),
        type: v.string(),
        x: v.number(),
        y: v.number(),
        width: v.number(),
        height: v.number(),
        angle: v.number(),
        strokeColor: v.string(),
        backgroundColor: v.string(),
        fillStyle: v.string(),
        strokeWidth: v.number(),
        roughness: v.number(),
        opacity: v.number(),
      })
    ),
    owner: v.id("users"),
    isPublic: v.boolean(),
  }).index("by_owner", ["owner"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
