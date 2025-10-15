import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const ClubStatesContext = createContext<ContextType>({
  
})

export const useClubStatesContext = () => useContext(ClubStatesContext)

export const ClubStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }

  return <ClubStatesContext.Provider value={value}>{children}</ClubStatesContext.Provider>
}
