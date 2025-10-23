import {createContext, useCallback, useContext} from 'react'
import {useDispatch} from 'react-redux'

import {useCommunityActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  addCommunityClub: (commOId: string, clubName: string) => Promise<boolean>
  addCommunityUser: (commOId: string, userId: string, password: string) => Promise<boolean>

  modifyCommunityClub: (clubOId: string, newClubName: string) => Promise<boolean>,
  modifyCommunityUser: (userOId: string, newUserId: string, newPassword: string, newCommAuth: number) => Promise<boolean>,

  loadUsersCommunity: () => Promise<boolean>
}
// prettier-ignore
export const CommunityCallbacksContext = createContext<ContextType>({
  addCommunityClub: () => Promise.resolve(false),
  addCommunityUser: () => Promise.resolve(false),

  modifyCommunityClub: () => Promise.resolve(false),
  modifyCommunityUser: () => Promise.resolve(false),

  loadUsersCommunity: () => Promise.resolve(false),
})

export const useCommunityCallbacksContext = () => useContext(CommunityCallbacksContext)

export const CommunityCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()
  const {setBanClub, setClubArr, setCommunity, setSubClub, setUserArr, setCommMemberArr} = useCommunityActions()

  // POST AREA:

  const addCommunityClub = useCallback(
    async (commOId: string, clubName: string) => {
      const url = `/client/community/addCommClub`
      const data: HTTP.AddCommClubDataType = {commOId, clubName}
      return F.postWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {clubArr} = body
            dispatch(setClubArr(clubArr))
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

  const addCommunityUser = useCallback(
    async (commOId: string, userId: string, password: string) => {
      const url = `/client/community/addCommUser`
      const data: HTTP.AddCommUserDataType = {commOId, userId, password}
      return F.postWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {userArr} = body
            dispatch(setUserArr(userArr))
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

  // PUT AREA:

  const modifyCommunityClub = useCallback(
    async (clubOId: string, newClubName: string) => {
      const url = `/client/community/modifyCommClub`
      const data: HTTP.ModifyCommClubDataType = {clubOId, newClubName}
      return F.putWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {clubArr} = body
            dispatch(setClubArr(clubArr))
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

  const modifyCommunityUser = useCallback(
    async (userOId: string, newUserId: string, newPassword: string, newCommAuth: number) => {
      const url = `/client/community/modifyCommUser`
      const data: HTTP.ModifyCommUserDataType = {userOId, newUserId, newPassword, newCommAuth}
      return F.putWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {userArr} = body
            dispatch(setUserArr(userArr))
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

  const loadUsersCommunity = useCallback(
    async () => {
      const url = `/client/community/loadUsersCommunity`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {banClub, community, clubArr, userArr, commMemberArr, subClub} = body
            dispatch(setCommunity(community))
            dispatch(setClubArr(clubArr))
            dispatch(setUserArr(userArr))
            dispatch(setCommMemberArr(commMemberArr))
            dispatch(setBanClub(banClub))
            dispatch(setSubClub(subClub))
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
    addCommunityClub,
    addCommunityUser,

    modifyCommunityClub,
    modifyCommunityUser,

    loadUsersCommunity,
  }
  return <CommunityCallbacksContext.Provider value={value}>{children}</CommunityCallbacksContext.Provider>
}
