"use client"
import ConversationContainer from '@/components/shared/conversations/ConversationContainer'
import ItemList from '@/components/shared/itemsList/ItemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React, { useState } from 'react'
import DMconversation from '../_components/DMconversation'
import { Loader2 } from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'
import Header from './_components/Header'
import Body from './_components/body/Body'
import ChatInput from './_components/input/ChatInput'
import RemoveFriendDialog from './_components/dialogs/RemoveFriendDialog'


type Props = {
    params: {conversationId: Id<"conversations">};
}
const ConversationPage = ({params: {conversationId}}: Props) => {

    const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false)
    const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false)
    const [leaveGroupDialogOpen, setLeaveGrouopDialogOpen] = useState(false)
    const [callType, setCallTyoe] = useState<"audio" | "video" | null>(null)
    
    const conversationin = useQuery(api.conversation.get, {id: conversationId})

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
        {
            conversationin === undefined ? <div className='w-full h-full flex items-center justify-center'>
                <Loader2 className='h-8 w-8' />
                </div>: conversation === null ?<p className='w-full h-full flex items-center justify-center'>conversation not found</p>: <ConversationContainer>
                    <RemoveFriendDialog conversationId={conversationId} open={removeFriendDialogOpen} setOpen={setRemoveFriendDialogOpen} />
                <Header 
                name={conversationin?.isGroup ? conversationin.name : conversationin?.otherMember.username || ""}
                imageUrl={conversationin?.isGroup? undefined: conversationin?.otherMember.imageurl} 
                options={conversationin?.isGroup ? [
                    {
                        label: "Leave Group",
                        destructive: false,
                        onClick: ()=> setLeaveGrouopDialogOpen(true),
                    },
                    {
                        label: "Delete Group",
                        destructive: true,
                        onClick: ()=> setDeleteGroupDialogOpen(true),
                    }

                ]: [
                    {
                        label: "Remove Friend",
                        destructive: true,
                        onClick: ()=> setRemoveFriendDialogOpen(true),
                    },
                ]}
                />
               
                <Body/>
                <ChatInput/>
            </ConversationContainer>
        }
    </>
    
  )
}

export default ConversationPage