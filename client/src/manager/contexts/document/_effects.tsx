import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const DocumentEffectsContext = createContext<ContextType>({})

export const useDocumentEffectsContext = () => useContext(DocumentEffectsContext)

export const DocumentEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  // 클럽 문서 불러오는건 ClubDocSubPage 에서 한다. (이거 로딩할때 불러오는게 맞다)

  return <DocumentEffectsContext.Provider value={{}}>{children}</DocumentEffectsContext.Provider>
}
