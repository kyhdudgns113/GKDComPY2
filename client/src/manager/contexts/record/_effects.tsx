import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const RecordEffectsContext = createContext<ContextType>({})

export const useRecordEffectsContext = () => useContext(RecordEffectsContext)

export const RecordEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  //
  return <RecordEffectsContext.Provider value={{}}>{children}</RecordEffectsContext.Provider>
}
