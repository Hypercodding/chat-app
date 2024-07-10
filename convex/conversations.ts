import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { ConvexError } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const currentUser = await getUserByClerkId({ ctx, clerkId: identity.subject });

    if (!currentUser) {
      throw new ConvexError("Not a user");
    }

    const conversationMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", q => q.eq("memberId", currentUser._id))
      .collect();

    const conversations = await Promise.all(
      conversationMemberships.map(async (membership: any) => {
        const conversation = await ctx.db.get(membership.conversationId as Id<"conversations">);
        if (!conversation) {
          throw new ConvexError("Conversation not found");
        }
        return conversation;
      })
    );

    const conversationsWithDetail = await Promise.all(
      conversations.map(async (conversation) => {
        const AllConversationMembers = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversationId", q => q.eq("conversationId", conversation._id as Id<"conversations">))
          .collect();

          if(conversation.isGroup){
            return {conversation}
          }
          else{
            const otherMemberships = AllConversationMembers.filter((membership) => membership.memberId !== currentUser._id)[0];
            const otherMember = await ctx.db.get(otherMemberships.memberId)

            return {
                conversation, otherMember
            }

          }
      })
    );

    return conversationsWithDetail;
  }
});
