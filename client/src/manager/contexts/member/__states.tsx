import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const MemberStatesContext = createContext<ContextType>({
  
})

export const useMemberStatesContext = () => useContext(MemberStatesContext)

export const MemberStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
      
  }

  return <MemberStatesContext.Provider value={value}>{children}</MemberStatesContext.Provider>
}
