import {createContext, useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {useAppDispatch, useCommunityStates, useClubActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const UrlEffectsContext = createContext<ContextType>({})

export const useUrlEffectsContext = () => useContext(UrlEffectsContext)

export const UrlEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {clubArr} = useCommunityStates()
  const {setClubOpened, resetClubOpened} = useClubActions()

  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    const url = location.pathname
    let clubOId = ''
    if (url.includes('/club/discuss/')) {
      clubOId = url.split('/club/discuss/')[1]
    } // ::
    else if (url.includes('/club/member/')) {
      clubOId = url.split('/club/member/')[1]
    } // ::
    else if (url.includes('/club/record/')) {
      clubOId = url.split('/club/record/')[1]
    } // ::

    if (clubOId) {
      const club = clubArr.find(club => club.clubOId === clubOId) || null
      if (club) {
        dispatch(setClubOpened(club))
      } // ::
      else {
        dispatch(resetClubOpened())
      }
    } // ::
    else {
      dispatch(resetClubOpened())
    }
  }, [clubArr, location, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps
  //
  return <UrlEffectsContext.Provider value={{}}>{children}</UrlEffectsContext.Provider>
}
