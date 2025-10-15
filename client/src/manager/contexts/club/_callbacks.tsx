import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const ClubCallbacksContext = createContext<ContextType>({
  
})

export const useClubCallbacksContext = () => useContext(ClubCallbacksContext)

export const ClubCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }
  return <ClubCallbacksContext.Provider value={value}>{children}</ClubCallbacksContext.Provider>
}
