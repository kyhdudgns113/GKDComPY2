import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const ClubEffectsContext = createContext<ContextType>({})

export const useClubEffectsContext = () => useContext(ClubEffectsContext)

export const ClubEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  //
  return <ClubEffectsContext.Provider value={{}}>{children}</ClubEffectsContext.Provider>
}
