import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const MemberEffectsContext = createContext<ContextType>({})

export const useMemberEffectsContext = () => useContext(MemberEffectsContext)

export const MemberEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  return <MemberEffectsContext.Provider value={{}}>{children}</MemberEffectsContext.Provider>
}
