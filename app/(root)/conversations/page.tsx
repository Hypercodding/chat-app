"use client"
import ConversationFallBack from '@/components/shared/conversations/ConversationFallBack'
import ItemList from '@/components/shared/itemsList/ItemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React from 'react'
import DMconversation from './_components/DMconversation'

type Props = {}

const ConversationsPage = () => {
    const conversation = useQuery(api.conversations.get)

  return (
    <>
    <ItemList title='Conversations' action=''>{
        conversation ? conversation.length === 0 ? <p className='w-full h-full items-center justify-center'>
            No conversation found
        </p> : (conversation.map((conversation)=>{
            return conversation.conversation.isGroup ? null : 
            <DMconversation
                key={conversation.conversation._id}
                id={conversation.conversation._id}
                username={conversation.otherMember?.username || ""}
                imageUrl={conversation.otherMember?.imageurl || ""}
                lastMessageContent={conversation.lastMessage?.content}
                lastMessageSender={conversation.lastMessage?.sender}

            />
        })) : <Loader2/>
    }</ItemList>
        <ConversationFallBack/>

    </>
    
  )
}

export default ConversationsPage