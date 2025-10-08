import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const LogCallbacksContext = createContext<ContextType>({
  
})

export const useLogCallbacksContext = () => useContext(LogCallbacksContext)

export const LogCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }
  return <LogCallbacksContext.Provider value={value}>{children}</LogCallbacksContext.Provider>
}
