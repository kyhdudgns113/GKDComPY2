import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const SocketEffectsContext = createContext<ContextType>({
  
})

export const useSocketEffectsContext = () => useContext(SocketEffectsContext)

export const SocketEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }

  return <SocketEffectsContext.Provider value={value}>{children}</SocketEffectsContext.Provider>
}
