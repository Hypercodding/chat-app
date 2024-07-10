import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
    args: {
        conversationId: v.id("conversations"),
        type: v.string(),
        content: v.array(v.string()),
    },
    handler: async(ctx, args)=>{
        const identity = await ctx.auth.getUserIdentity()

    if(!identity){
        throw new ConvexError("UnAuthorized")
    }

    const currentUser = await getUserByClerkId({ctx, clerkId: identity.subject})

    if(!currentUser){
        throw new ConvexError("Not a user")
    }
    }
})