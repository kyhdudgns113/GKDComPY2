import {createContext, useCallback, useContext} from 'react'
import {useDispatch} from 'react-redux'

import {communitySlice} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  loadUsersCommunity: () => Promise<boolean>
}
// prettier-ignore
export const CommunityCallbacksContext = createContext<ContextType>({
  loadUsersCommunity: () => Promise.resolve(false),
})

export const useCommunityCallbacksContext = () => useContext(CommunityCallbacksContext)

export const CommunityCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()
  const {setCommunity} = communitySlice.actions

  // GET AREA:

  const loadUsersCommunity = useCallback(
    async () => {
      const url = `/client/community/loadCommunity`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {community} = body
            dispatch(setCommunity(community))
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
    loadUsersCommunity,
  }
  return <CommunityCallbacksContext.Provider value={value}>{children}</CommunityCallbacksContext.Provider>
}
