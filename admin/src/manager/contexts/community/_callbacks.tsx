import {createContext, useCallback, useContext} from 'react'
import {useDispatch} from 'react-redux'
import {modifyCommunity, modifyCommUser, setCommunityArr, setCommUserArr, setCommClubArr} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  addCommunity: (commName: string) => Promise<boolean>
  addCommunityClub: (commOId: string, clubName: string) => Promise<boolean>
  addCommunityUser: (commOId: string, userId: string, password: string) => Promise<boolean>

  modifyCommunityUser: (userOId: string, newUserId: string, newPassword: string, newCommAuth: number) => Promise<boolean>

  loadCommArr: () => Promise<boolean>
  loadCommClubArr: (commOId: string) => Promise<boolean>
  loadCommUserArr: (commOId: string) => Promise<boolean>

  deleteCommunityUser: (userOId: string) => Promise<boolean>
}
// prettier-ignore
export const CommunityCallbacksContext = createContext<ContextType>({
  addCommunity: () => Promise.resolve(false),
  addCommunityClub: () => Promise.resolve(false),
  addCommunityUser: () => Promise.resolve(false),

  modifyCommunityUser: () => Promise.resolve(false),

  loadCommArr: () => Promise.resolve(false),
  loadCommClubArr: () => Promise.resolve(false),
  loadCommUserArr: () => Promise.resolve(false),

  deleteCommunityUser: () => Promise.resolve(false),
})

export const useCommunityCallbacksContext = () => useContext(CommunityCallbacksContext)

export const CommunityCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()

  // POST AREA:

  const addCommunity = useCallback(
    async (commName: string) => {
      const url = '/admin/community/addCommunity'
      const data: HTTP.AddCommunityDataType = {commName}

      return F.postWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res

          if (ok) {
            const {commArr} = body
            dispatch(setCommunityArr(commArr))
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
    [dispatch]
  )

  const addCommunityClub = useCallback(
    async (commOId: string, clubName: string) => {
      const url = '/admin/community/addCommClub'
      const data: HTTP.AddCommClubDataType = {commOId, clubName}
      return F.postWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {clubArr} = body
            dispatch(setCommClubArr(clubArr))
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
    [dispatch]
  )

  const addCommunityUser = useCallback(
    async (commOId: string, userId: string, password: string) => {
      /**
       * 공동체의 유저배열만 업데이트하는게 아닌, 공동체 자체를 업데이트 해야한다
       * - 사용자들이 클럽이나 유저를 변경했을 수 있다
       */
      const url = `/admin/community/addCommUser`
      const data: HTTP.AddCommUserDataType = {commOId, userId, password}
      return F.postWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res

          if (ok) {
            const {community} = body
            dispatch(modifyCommunity(community))
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
    [dispatch]
  )

  // PUT AREA:

  const modifyCommunityUser = useCallback(
    async (userOId: string, newUserId: string, newPassword: string, newCommAuth: number) => {
      const url = `/admin/community/modifyCommUser`
      const data: HTTP.ModifyCommUserDataType = {userOId, newUserId, newPassword, newCommAuth}

      return F.putWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {user} = body
            dispatch(modifyCommUser(user))
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
    [dispatch]
  )

  // GET AREA:

  const loadCommArr = useCallback(async () => {
    const url = '/admin/community/loadCommArr'

    return F.getWithJwt(url) // ::
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {commArr} = body
          dispatch(setCommunityArr(commArr))
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
  }, [dispatch])

  const loadCommClubArr = useCallback(
    async (commOId: string) => {
      const url = `/admin/community/loadCommClubArr/${commOId}`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {clubArr} = body
            dispatch(setCommClubArr(clubArr))
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
    [dispatch]
  )

  const loadCommUserArr = useCallback(
    async (commOId: string) => {
      const url = `/admin/community/loadCommUserArr/${commOId}`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res

          if (ok) {
            const {userArr} = body
            dispatch(setCommUserArr(userArr))
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
    [dispatch]
  )

  // DELETE AREA:

  const deleteCommunityUser = useCallback(
    async (userOId: string) => {
      const url = `/admin/community/deleteCommUser/${userOId}`
      return F.delWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {userArr} = body
            dispatch(setCommUserArr(userArr))
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
    addCommunity,
    addCommunityClub,
    addCommunityUser,

    modifyCommunityUser,

    loadCommArr,
    loadCommClubArr,
    loadCommUserArr,

    deleteCommunityUser,
  }
  return <CommunityCallbacksContext.Provider value={value}>{children}</CommunityCallbacksContext.Provider>
}
