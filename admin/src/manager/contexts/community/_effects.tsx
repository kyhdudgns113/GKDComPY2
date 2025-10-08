import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const CommunityEffectsContext = createContext<ContextType>({})

export const useCommunityEffectsContext = () => useContext(CommunityEffectsContext)

export const CommunityEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  //
  return <CommunityEffectsContext.Provider value={{}}>{children}</CommunityEffectsContext.Provider>
}
