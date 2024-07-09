import ConversationFallBack from '@/components/shared/conversations/ConversationFallBack'
import ItemList from '@/components/shared/itemsList/ItemList'
import React from 'react'

type Props = {}

const ConversationsPage = () => {
  return (
    <>
    <ItemList title='Conversations' action=''>Conversations</ItemList>
        <ConversationFallBack/>

    </>
    
  )
}

export default ConversationsPage