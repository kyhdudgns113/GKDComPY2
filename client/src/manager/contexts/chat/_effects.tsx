import {createContext, useContext, useEffect} from 'react'

import {useAuthStatesContext, useChatCallbacksContext, useSocketCallbacksContext, useSocketStatesContext} from '@context'
import {decodeJwtFromServer, encodeJwtFromClient, jwtHeaderLenBase} from '@secret'
import {useAppDispatch, useChatActions, useChatStates, useClubStates} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as SCK from '@socketType'
import * as ST from '@shareType'
import * as U from '@util'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const ChatEffectsContext = createContext<ContextType>({})

export const useChatEffectsContext = () => useContext(ChatEffectsContext)

export const ChatEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {userOId, socketValidated} = useAuthStatesContext()
  const {clubOpened} = useClubStates()

  const {loadClubChatArr} = useChatCallbacksContext()
  const {chatRoomOId, chatQueue} = useChatStates()
  const {popChatQueueToArr, pushChatQueue, resetChatArr, resetChatRoomOId, resetChatQueue, setChatRoomOId} = useChatActions()

  const {socket} = useSocketStatesContext()
  const {onSocket, emitSocket} = useSocketCallbacksContext()

  const dispatch = useAppDispatch()

  // 초기화: 채팅 내용 불러오기
  useEffect(() => {
    if (!clubOpened || clubOpened.clubOId === '') {
      return
    }

    loadClubChatArr(clubOpened.clubOId, -1)
    dispatch(setChatRoomOId(clubOpened.chatRoomOId))

    return () => {
      dispatch(resetChatArr())
      dispatch(resetChatRoomOId())
      dispatch(resetChatQueue())
    }
  }, [clubOpened, dispatch, loadClubChatArr]) // eslint-disable-line react-hooks/exhaustive-deps

  // 소켓 송신: [chatRoom connect, chatRoom disconnect]: 채팅방 옮길때
  useEffect(() => {
    // 소켓이 인증이 되어있어야만 채팅소켓에 연결할 수 있다.
    // 누가 먼저 실행될지 모르니 이걸 해준다.
    if (socket && chatRoomOId && userOId && socketValidated) {
      U.readStringP('jwtFromServer').then(jwtFromServer => {
        if (!jwtFromServer) {
          alert('왜 토큰이 없지')
          return
        }

        const {header, jwtBody} = decodeJwtFromServer(jwtFromServer || '', jwtHeaderLenBase)
        const jwtFromClient = encodeJwtFromClient(header, jwtBody)
        const payload: SCK.ChatRoomConnectType = {chatRoomOId, userOId, jwtFromClient}
        emitSocket(socket, 'chatRoom connect', payload)
      })
    }

    return () => {
      if (socket && chatRoomOId && userOId && socketValidated) {
        const payload: SCK.ChatRoomDisconnectType = {chatRoomOId, userOId}
        emitSocket(socket, 'chatRoom disconnect', payload)
      }
    }
  }, [socket, chatRoomOId, userOId, socketValidated]) // eslint-disable-line react-hooks/exhaustive-deps

  // 소켓 수신: chat message
  useEffect(() => {
    if (socket) {
      onSocket(socket, 'chat message', (payload: SCK.NewChatType) => {
        const chatBlock: ST.ChatType = {
          chatIdx: payload.chatIdx,
          chatRoomOId: payload.chatRoomOId,
          content: payload.content,
          date: new Date(payload.date),
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
