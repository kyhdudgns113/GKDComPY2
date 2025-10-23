import {createContext, useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {useAppDispatch, useCommunityStates, useClubActions, useMemberActions, useRecordActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const UrlEffectsContext = createContext<ContextType>({})

export const useUrlEffectsContext = () => useContext(UrlEffectsContext)

export const UrlEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {banClub, clubArr, community, subClub} = useCommunityStates()
  const {setClubOpened, resetClubOpened} = useClubActions()
  const {unselectClubMemberOpened} = useMemberActions()
  const {setWeekOIdOpened, resetWeekOIdOpened} = useRecordActions()

  const dispatch = useAppDispatch()
  const location = useLocation()

  // URL 바뀔때 clubOpened, weekOIdOpened 설정
  useEffect(() => {
    const url = location.pathname
    let clubOId = ''
    let weekOId = ''
    if (url.includes('/club/discuss/')) {
      clubOId = url.split('/club/discuss/')[1]
    } // ::
    else if (url.includes('/club/member/')) {
      clubOId = url.split('/club/member/')[1]
    } // ::
    else if (url.includes('/club/record/')) {
      clubOId = url.split('/club/record/')[1].split('/')[0]
      weekOId = url.split('/club/record/')[1].split('/')[1]
    } // ::

    if (clubOId) {
      const club = clubArr.find(club => club.clubOId === clubOId) || null
      if (club) {
        dispatch(setClubOpened(club))
        if (weekOId) {
          dispatch(setWeekOIdOpened(weekOId))
        } // ::
        else {
          dispatch(resetWeekOIdOpened())
        }
      } // ::
      else if (clubOId === community.banClubOId) {
        dispatch(setClubOpened(banClub))
      } // ::
      else if (clubOId === community.subClubOId) {
        dispatch(setClubOpened(subClub))
      } // ::
      else {
        dispatch(resetClubOpened())
        dispatch(resetWeekOIdOpened())
      }
    } // ::
    else {
      dispatch(resetClubOpened())
      dispatch(resetWeekOIdOpened())
    }
  }, [banClub, clubArr, community, subClub, location, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  // URL 바뀔때 clubMemberOpened 해제
  useEffect(() => {
    return () => {
      dispatch(unselectClubMemberOpened())
    }
  }, [location, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps
  //
  return <UrlEffectsContext.Provider value={{}}>{children}</UrlEffectsContext.Provider>
}
