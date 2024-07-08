// convex/functions.ts
import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    username: v.string(),
    imageurl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", args);
  },
});

export const getUserByClerkId = internalQuery({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    return ctx.db.query("users").withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId)).unique();
  },
});
