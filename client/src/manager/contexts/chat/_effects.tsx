import {createContext, useContext, useEffect} from 'react'

import {useSocketCallbacksContext, useSocketStatesContext} from '@context'
import {useAppDispatch, useChatActions, useChatStates} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as SCK from '@socketType'
import * as ST from '@shareType'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const ChatEffectsContext = createContext<ContextType>({})

export const useChatEffectsContext = () => useContext(ChatEffectsContext)

export const ChatEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {chatQueue} = useChatStates()
  const {popChatQueueToArr, pushChatQueue} = useChatActions()

  const {socket} = useSocketStatesContext()
  const {onSocket} = useSocketCallbacksContext()

  const dispatch = useAppDispatch()

  // 소켓 수신: chat message
  useEffect(() => {
    if (socket) {
      onSocket(socket, 'chat message', (payload: SCK.NewChatType) => {
        const chatBlock: ST.ChatType = {
          chatIdx: payload.chatIdx,
          clubOId: payload.clubOId,
          contents: payload.contents,
          createdAt: payload.createdAt,
          userId: payload.userId,
          userOId: payload.userOId
        }
        dispatch(pushChatQueue(chatBlock))
      })
    }
  }, [socket, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  // 채팅 큐에 채팅 있으면 배열로 넘겨줌
  useEffect(() => {
    if (chatQueue.length > 0) {
      dispatch(popChatQueueToArr())
    }
  }, [chatQueue, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return <ChatEffectsContext.Provider value={{}}>{children}</ChatEffectsContext.Provider>
}
