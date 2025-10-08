import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const LogEffectsContext = createContext<ContextType>({})

export const useLogEffectsContext = () => useContext(LogEffectsContext)

export const LogEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  //
  return <LogEffectsContext.Provider value={{}}>{children}</LogEffectsContext.Provider>
}
