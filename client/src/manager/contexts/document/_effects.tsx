import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const DocumentEffectsContext = createContext<ContextType>({})

export const useDocumentEffectsContext = () => useContext(DocumentEffectsContext)

export const DocumentEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  //
  return <DocumentEffectsContext.Provider value={{}}>{children}</DocumentEffectsContext.Provider>
}
