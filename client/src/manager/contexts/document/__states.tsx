import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const DocumentStatesContext = createContext<ContextType>({
  
})

export const useDocumentStatesContext = () => useContext(DocumentStatesContext)

export const DocumentStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }

  return <DocumentStatesContext.Provider value={value}>{children}</DocumentStatesContext.Provider>
}
