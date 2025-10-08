import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const CommunityStatesContext = createContext<ContextType>({
  
})

export const useCommunityStatesContext = () => useContext(CommunityStatesContext)

export const CommunityStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }

  return <CommunityStatesContext.Provider value={value}>{children}</CommunityStatesContext.Provider>
}
