import {createContext, useCallback, useContext} from 'react'

import {useAppDispatch, useChatActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  loadClubChatArr: (clubOId: string, lastChatIdx: number) => Promise<boolean>
}
// prettier-ignore
export const ChatCallbacksContext = createContext<ContextType>({
  loadClubChatArr: () => Promise.resolve(false),
})

export const useChatCallbacksContext = () => useContext(ChatCallbacksContext)

export const ChatCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const {setChatArr} = useChatActions()

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
  // prettier-ignore
  const value: ContextType = {
    loadClubChatArr,
  }
  return <ChatCallbacksContext.Provider value={value}>{children}</ChatCallbacksContext.Provider>
}
