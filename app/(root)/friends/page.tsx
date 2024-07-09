"use client"
import ConversationFallBack from '@/components/shared/conversations/ConversationFallBack'
import ItemList from '@/components/shared/itemsList/ItemList'
import React from 'react'
import AddFriendsDialog from './_components/AddFriendsDialog'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'
import Request from './_components/Request'

type Props = {}

const FriendsPage = (props: Props) => {
    const request = useQuery(api.requests.get)
  return (
    <>
        <ItemList title='Friends' action={<AddFriendsDialog/>}>
            {request ? request.length === 0 ? <p>No friend request found</p>: request.map((request)=>{
                return <Request key={request.request._id} id={request.request._id} imageUrl={request.sender.imageurl}
                        username={request.sender.username} email={request.sender.email} 
                        />;
            }) : <Loader2/>}
            </ItemList>
            <ConversationFallBack />
        </>
  )
}

export default FriendsPage