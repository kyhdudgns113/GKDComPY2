import {createContext, useContext, useState} from 'react'

import type {FC, PropsWithChildren} from 'react'
import type {SocketType} from '@type'

// prettier-ignore
type ContextType = {
  socket: SocketType
  setSocket: (socket: SocketType) => void
}
// prettier-ignore
export const SocketStatesContext = createContext<ContextType>({
  socket: null,
  setSocket: () => {}
})

export const useSocketStatesContext = () => useContext(SocketStatesContext)

export const SocketStatesProvider: FC<PropsWithChildren> = ({children}) => {
  const [socket, setSocket] = useState<SocketType>(null)

  // prettier-ignore
  const value: ContextType = {
    socket,
    setSocket
  }

  return <SocketStatesContext.Provider value={value}>{children}</SocketStatesContext.Provider>
}
