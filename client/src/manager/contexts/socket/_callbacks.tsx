import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const SocketCallbacksContext = createContext<ContextType>({
  
})

export const useSocketCallbacksContext = () => useContext(SocketCallbacksContext)

export const SocketCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }

  return <SocketCallbacksContext.Provider value={value}>{children}</SocketCallbacksContext.Provider>
}
