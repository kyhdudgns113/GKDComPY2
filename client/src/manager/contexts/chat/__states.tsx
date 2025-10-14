import {createContext, useContext, useRef, useState} from 'react'

import type {FC, PropsWithChildren, RefObject} from 'react'
import type {Setter} from '@type'

// prettier-ignore
type ContextType = {
  chatArrDivRef: RefObject<HTMLDivElement | null>

  goToBottom: boolean, setGoToBottom: Setter<boolean>
}
// prettier-ignore
export const ChatStatesContext = createContext<ContextType>({
  chatArrDivRef: {current: null},

  goToBottom: false, setGoToBottom: () => {}
})

export const useChatStatesContext = () => useContext(ChatStatesContext)

export const ChatStatesProvider: FC<PropsWithChildren> = ({children}) => {
  const [goToBottom, setGoToBottom] = useState<boolean>(false)

  const chatArrDivRef = useRef<HTMLDivElement | null>(null)

  // prettier-ignore
  const value: ContextType = {
    chatArrDivRef,

    goToBottom, setGoToBottom
  }

  return <ChatStatesContext.Provider value={value}>{children}</ChatStatesContext.Provider>
}
