import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const RecordCallbacksContext = createContext<ContextType>({
  
})

export const useRecordCallbacksContext = () => useContext(RecordCallbacksContext)

export const RecordCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }
  return <RecordCallbacksContext.Provider value={value}>{children}</RecordCallbacksContext.Provider>
}
