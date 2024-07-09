import ConversationContainer from '@/components/shared/conversations/ConversationContainer'
import ItemList from '@/components/shared/itemsList/ItemList'
import React from 'react'

type Props = {}

const ConversationPage = (props: Props) => {
  return (
    <>
    <ItemList title='coversations'>Conversations</ItemList>
        <ConversationContainer>Conversation</ConversationContainer>

    </>
    
  )
}

export default ConversationPage