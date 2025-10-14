import {createContext, useContext, useEffect} from 'react'

import {useAppDispatch, useChatActions, useChatStates} from '@store'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const ChatEffectsContext = createContext<ContextType>({})

export const useChatEffectsContext = () => useContext(ChatEffectsContext)

export const ChatEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {chatQueue} = useChatStates()
  const {popChatQueueToArr} = useChatActions()

  const dispatch = useAppDispatch()

  // 채팅 큐에 채팅 있으면 배열로 넘겨줌
  useEffect(() => {
    if (chatQueue.length > 0) {
      dispatch(popChatQueueToArr())
    }
  }, [chatQueue, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return <ChatEffectsContext.Provider value={{}}>{children}</ChatEffectsContext.Provider>
}
