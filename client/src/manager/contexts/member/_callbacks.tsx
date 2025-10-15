import {createContext, useCallback, useContext} from 'react'

import {useAppDispatch, useMemberActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  loadClubMemberArr: (clubOId: string) => Promise<boolean>
}
// prettier-ignore
export const MemberCallbacksContext = createContext<ContextType>({
  loadClubMemberArr: () => Promise.resolve(false),
})

export const useMemberCallbacksContext = () => useContext(MemberCallbacksContext)

export const MemberCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const {setClubMemberArr} = useMemberActions()

  const loadClubMemberArr = useCallback(async (clubOId: string) => {
    const url = `/client/member/loadClubMemberArr/${clubOId}`
    return F.getWithJwt(url)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {clubMemberArr} = body
          dispatch(setClubMemberArr(clubMemberArr))
          return true
        } // ::
        else {
          U.alertErrMsg(url, statusCode, gkdErrMsg, message)
          return false
        }
      })
      .catch(errObj => {
        U.alertErrors(url, errObj)
        return false
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // prettier-ignore
  const value: ContextType = {
    loadClubMemberArr,
  }
  return <MemberCallbacksContext.Provider value={value}>{children}</MemberCallbacksContext.Provider>
}
