import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const CommunityEffectsContext = createContext<ContextType>({})

export const useCommunityEffectsContext = () => useContext(CommunityEffectsContext)

export const CommunityEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  /**
   * 여기서 loadCommArr 호출 안한다.
   * - 어차피 공동체 관리 페이지 들어가면 다시 호출해야한다
   * - 여기서도 호출하게되면 중복으로 불러오게된다.
   */

  //
  return <CommunityEffectsContext.Provider value={{}}>{children}</CommunityEffectsContext.Provider>
}
