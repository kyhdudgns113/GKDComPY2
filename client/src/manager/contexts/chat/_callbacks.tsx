import {createContext, useCallback, useContext} from 'react'

import {useAppDispatch, useChatActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as U from '@util'
import * as T from '@type'

// prettier-ignore
type ContextType = {
  loadClubChatArr: (clubOId: string, lastChatIdx: number) => Promise<boolean>

  chatMessage: (socket: T.SocketType, userOId: string, userId: string, contents: string) => void
}
// prettier-ignore
export const ChatCallbacksContext = createContext<ContextType>({
  loadClubChatArr: () => Promise.resolve(false),

  chatMessage: () => {},
})

export const useChatCallbacksContext = () => useContext(ChatCallbacksContext)

export const ChatCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const {setChatArr} = useChatActions()

  // GET AREA:

  const loadClubChatArr = useCallback(
    async (clubOId: string, lastChatIdx: number) => {
      const url = `/client/chat/loadClubChatArr/${clubOId}/${lastChatIdx}`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res

          if (ok) {
            const {chatArr} = body
            dispatch(setChatArr(chatArr))
            return true
          } // ::
          else {
            U.alertErrMsg(url, statusCode, gkdErrMsg, message)
            return false
          }
        })
        .catch(errObj => {
          U.alertErrors(url, errObj)
          return false
        })
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // SOCKET AREA:

  const chatMessage = useCallback((socket: T.SocketType, userOId: string, userId: string, contents: string) => {
    socket?.emit('chatMessage', {userOId, userId, contents})
  }, [])

  // prettier-ignore
  const value: ContextType = {
    loadClubChatArr,

    chatMessage,
  }
  return <ChatCallbacksContext.Provider value={value}>{children}</ChatCallbacksContext.Provider>
}
