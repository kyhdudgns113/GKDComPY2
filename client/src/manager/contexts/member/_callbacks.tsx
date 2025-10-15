import {createContext, useCallback, useContext} from 'react'

import {useAppDispatch, useMemberActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as HTTP from '@httpType'
import * as F from '@fetch'
import * as ST from '@shareType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  addClubMember: (commOId: string, clubOId: string, memName: string, batterPower: number, pitcherPower: number) => Promise<boolean>

  moveClubMember: (prevClubOId: string, clubOId: string, memOId: string) => Promise<boolean>
  saveClubMemberInfo: (member: ST.MemberType) => Promise<boolean>

  loadClubMemberArr: (clubOId: string) => Promise<boolean>

  removeClubMember: (clubOId: string, memOId: string) => Promise<boolean>
}
// prettier-ignore
export const MemberCallbacksContext = createContext<ContextType>({
  addClubMember: () => Promise.resolve(false),

  moveClubMember: () => Promise.resolve(false),
  saveClubMemberInfo: () => Promise.resolve(false),

  loadClubMemberArr: () => Promise.resolve(false),

  removeClubMember: () => Promise.resolve(false),
})

export const useMemberCallbacksContext = () => useContext(MemberCallbacksContext)

export const MemberCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const {setClubMemberArr, unselectClubMemberOpened} = useMemberActions()

  // POST AREA:

  const addClubMember = useCallback(async (commOId: string, clubOId: string, memName: string, batterPower: number, pitcherPower: number) => {
    const url = `/client/member/addClubMember`
    const data: HTTP.AddClubMemberDataType = {commOId, clubOId, memName, batterPower, pitcherPower}
    return F.postWithJwt(url, data)
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

  // PUT AREA:

  const moveClubMember = useCallback(
    async (prevClubOId: string, clubOId: string, memOId: string) => {
      const url = `/client/member/moveClubMember`
      const data: HTTP.MoveClubMemberDataType = {prevClubOId, clubOId, memOId}
      return F.putWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {clubMemberArr} = body
            dispatch(setClubMemberArr(clubMemberArr))
            dispatch(unselectClubMemberOpened())
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
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const saveClubMemberInfo = useCallback(
    async (member: ST.MemberType) => {
      const url = `/client/member/saveClubMemberInfo`

      const {clubOId, memOId, memName, batterPower, pitcherPower, memberComment, position} = member

      const data: HTTP.SaveClubMemberInfoDataType = {clubOId, memOId, memName, batterPower, pitcherPower, memberComment, position}
      return F.putWithJwt(url, data)
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
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // GET AREA:

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

  // DELETE AREA:

  const removeClubMember = useCallback(
    async (clubOId: string, memOId: string) => {
      const url = `/client/member/removeClubMember/${clubOId}/${memOId}`
      return F.delWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {clubMemberArr} = body
            dispatch(setClubMemberArr(clubMemberArr))
            dispatch(unselectClubMemberOpened())
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
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // prettier-ignore
  const value: ContextType = {
    addClubMember,

    moveClubMember,
    saveClubMemberInfo,

    loadClubMemberArr,

    removeClubMember,
  }
  return <MemberCallbacksContext.Provider value={value}>{children}</MemberCallbacksContext.Provider>
}
