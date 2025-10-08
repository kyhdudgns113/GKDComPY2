import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const LogStatesContext = createContext<ContextType>({
  
})

export const useLogStatesContext = () => useContext(LogStatesContext)

export const LogStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }

  return <LogStatesContext.Provider value={value}>{children}</LogStatesContext.Provider>
}
