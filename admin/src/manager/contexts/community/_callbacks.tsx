import {createContext, useCallback, useContext} from 'react'
import {useDispatch} from 'react-redux'
import {modifyCommunity, setCommunityArr, setCommUserArr} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  addCommunity: (commName: string) => Promise<boolean>
  addCommunityUser: (commOId: string, userId: string, password: string) => Promise<boolean>

  loadCommArr: () => Promise<boolean>
  loadCommUserArr: (commOId: string) => Promise<boolean>
}
// prettier-ignore
export const CommunityCallbacksContext = createContext<ContextType>({
  addCommunity: () => Promise.resolve(false),
  addCommunityUser: () => Promise.resolve(false),

  loadCommArr: () => Promise.resolve(false),
  loadCommUserArr: () => Promise.resolve(false)
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

  // prettier-ignore
  const value: ContextType = {
    addCommunity,
    addCommunityUser,

    loadCommArr,
    loadCommUserArr
  }
  return <CommunityCallbacksContext.Provider value={value}>{children}</CommunityCallbacksContext.Provider>
}
