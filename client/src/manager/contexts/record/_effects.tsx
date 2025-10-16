import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const RecordEffectsContext = createContext<ContextType>({})

export const useRecordEffectsContext = () => useContext(RecordEffectsContext)

export const RecordEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  /**
   * 주차 목록 불러오는 기능은 WeekRowListSubPage 에서 한다.
   * 이 서브페이지가 로딩될때 주차 목록을 불러와야 한다
   * context 에서 해버리면 클럽회의록 열때도 로딩이 되어버린다.
   */

  // ::
  return <RecordEffectsContext.Provider value={{}}>{children}</RecordEffectsContext.Provider>
}
