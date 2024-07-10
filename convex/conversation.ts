import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { ConvexError, v } from "convex/values";

export const get = query({args: {id: v.id("conversations")}, handler: async(ctx, args)=>{
    const identity = await ctx.auth.getUserIdentity()

    if(!identity){
        throw new ConvexError("UnAuthorized")
    }

    const currentUser = await getUserByClerkId({ctx, clerkId: identity.subject})

    if(!currentUser){
        throw new ConvexError("Not a user")
    }

    const conversation = await ctx.db.get(args.id)
    if(!conversation){
        throw new ConvexError("No conversation found")
    }

    const membership = await ctx.db.query("conversationMembers").withIndex("by_memberId_conversationId", q=>q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)).unique();

    if(!membership){
        throw new ConvexError("You are not a member of this conversation")
    }

    const allConversationMemberships = await ctx.db.query("conversationMembers").withIndex("by_conversationId", q=>q.eq("conversationId", args.id)).collect();

    if(!conversation.isGroup){
        const otherMembership = allConversationMemberships.filter(membership => membership.memberId !== currentUser._id)[0]
        const otherMembersDetail = await ctx.db.get(otherMembership.memberId);

        return {
            ...conversation,
            otherMember: {
                ...otherMembersDetail,
                lastSeenMessageId: otherMembership.lastMessage
            },
            otherMembers: null,
        }
    }
}})