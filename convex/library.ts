import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const libraries = await ctx.db
      .query("libraries")
      .withIndex("by_owner", (q) => q.eq("owner", userId))
      .collect();

    return libraries;
  },
});

export const create = mutation({
  args: {
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
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("libraries", {
      name: args.name,
      elements: args.elements,
      owner: userId,
      isPublic: args.isPublic,
    });
  },
});
