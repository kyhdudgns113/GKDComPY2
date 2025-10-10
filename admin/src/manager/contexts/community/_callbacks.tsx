import {createContext, useCallback, useContext} from 'react'
import {useDispatch} from 'react-redux'
import {setCommunityArr} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as ST from '@shareType'
import * as T from '@type'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  addCommunity: (commName: string) => Promise<boolean>

  loadCommArr: () => Promise<boolean>
  loadCommUserArr: (commOId: string, setter: T.Setter<ST.UserType[]>) => Promise<boolean>
}
// prettier-ignore
export const CommunityCallbacksContext = createContext<ContextType>({
  addCommunity: () => Promise.resolve(false),

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

  const loadCommUserArr = useCallback(async (commOId: string, setter: T.Setter<ST.UserType[]>) => {
    const url = `/admin/community/loadCommUserArr/${commOId}`
    return F.getWithJwt(url)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {userArr} = body
          setter(userArr)
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
  }, [])

  // prettier-ignore
  const value: ContextType = {
    addCommunity,

    loadCommArr,
    loadCommUserArr
  }
  return <CommunityCallbacksContext.Provider value={value}>{children}</CommunityCallbacksContext.Provider>
}
