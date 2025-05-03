import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");

    const userId = await getAuthUserId(ctx);
    if (!board.isPublic && !userId) {
      throw new Error("Not authorized");
    }

    if (!board.isPublic && !board.collaborators.includes(userId!)) {
      throw new Error("Not authorized");
    }

    return board;
  },
});

export const list = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_owner", (q) => q.eq("owner", userId))
      .collect();

    return boards;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("boards", {
      name: args.name,
      elements: [],
      viewState: {
        scrollX: 0,
        scrollY: 0,
        zoom: 1,
      },
      collaborators: [userId],
      owner: userId,
      isPublic: args.isPublic,
      lastModified: Date.now(),
    });
  },
});

export const updateName = mutation({
  args: {
    boardId: v.id("boards"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");

    if (!board.isPublic && !board.collaborators.includes(userId)) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.boardId, {
      name: args.name,
      lastModified: Date.now(),
    });
  },
});

export const updateElements = mutation({
  args: {
    boardId: v.id("boards"),
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
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");

    if (!board.isPublic && !board.collaborators.includes(userId)) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.boardId, {
      elements: args.elements.map(element => ({
        ...element,
        lastModifiedBy: userId,
      })),
      lastModified: Date.now(),
    });
  },
});

export const updateViewState = mutation({
  args: {
    boardId: v.id("boards"),
    viewState: v.object({
      scrollX: v.number(),
      scrollY: v.number(),
      zoom: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");

    if (!board.isPublic && !board.collaborators.includes(userId)) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.boardId, {
      viewState: args.viewState,
      lastModified: Date.now(),
    });
  },
});
