// convex/functions.ts
import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    username: v.string(),
    imageurl: v.string(),
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
   // Check if a user with the same email already exists
   const users = await ctx.db.query("users").withIndex("by_email", q => q.eq("email", args.email)).collect();

   if (users.length > 0) {
     throw new ConvexError("User already exists");
   }
    await ctx.db.insert("users", args);
  },
});

export const getUserByClerkId = internalQuery({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    return ctx.db.query("users").withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId)).unique();
  },
});
