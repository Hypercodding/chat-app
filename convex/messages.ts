import { Id } from './_generated/dataModel';
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { ConvexError, v } from "convex/values";

export const get = query({
  args: {
    id: v.id("conversations")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

    if (!currentUser) {
      throw new ConvexError("Not a user");
    }

    const membership = await ctx.db.query("conversationMembers").withIndex("by_memberId_conversationId", q=>q.eq("memberId", currentUser._id).eq("conversationId", args.id)).unique();

    if(!membership){
        throw new ConvexError("You are not the member of this Conversation!")
    }

    const messages = await ctx.db.query("messages").withIndex("by_conversationId", q=>q.eq("conversationId", args.id)).order("desc").collect()

    const messagesWithUser = Promise.all(
        messages.map(async message=>{
            const messageSender = await ctx.db.get(message.senderId);
            if(!messageSender){
                throw new ConvexError("could not find the sender of message")
            }
            return {
                message,
                senderImage: messageSender.imageurl,
                senderName: messageSender.username,
                isCurrentUser: messageSender._id === currentUser._id


            }
        })
    );
    return messagesWithUser;
  }
});
