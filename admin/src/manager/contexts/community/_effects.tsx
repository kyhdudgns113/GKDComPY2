import {createContext, useContext, useEffect} from 'react'
import {useAppSelector} from '@store'
import {selectCommOIdSelected} from '@store'

import {useCommunityCallbacksContext} from './_callbacks'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const CommunityEffectsContext = createContext<ContextType>({})

export const useCommunityEffectsContext = () => useContext(CommunityEffectsContext)

export const CommunityEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {loadCommClubArr, loadCommUserArr} = useCommunityCallbacksContext()

  const commOIdSelected = useAppSelector(selectCommOIdSelected)

  /**
   * 여기서 loadCommArr 호출 안한다.
   * - 어차피 공동체 관리 페이지 들어가면 다시 호출해야한다
   * - 여기서도 호출하게되면 중복으로 불러오게된다.
   */

  /**
   * 자동 변경: commOIdSelected
   * - 공동체의 유저 목록을 불러온다
   * - 공동체의 클럽 목록을 불러온다
   */
  useEffect(() => {
    if (!commOIdSelected) return

    loadCommUserArr(commOIdSelected)
    loadCommClubArr(commOIdSelected)
  }, [commOIdSelected, loadCommClubArr, loadCommUserArr])

  //
  return <CommunityEffectsContext.Provider value={{}}>{children}</CommunityEffectsContext.Provider>
}
