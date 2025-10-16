import {useAppDispatch, useRecordActions} from '@store'
import {createContext, useCallback, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  loadClubWeekRowArr: (clubOId: string) => Promise<boolean>
}
// prettier-ignore
export const RecordCallbacksContext = createContext<ContextType>({
  loadClubWeekRowArr: async () => false,
})

export const useRecordCallbacksContext = () => useContext(RecordCallbacksContext)

export const RecordCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const {setWeekRowArr} = useRecordActions()

  const loadClubWeekRowArr = useCallback(
    async (clubOId: string) => {
      const url = `/client/record/loadClubWeekRowArr/${clubOId}`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {weekRowArr} = body
            dispatch(setWeekRowArr(weekRowArr))
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
    loadClubWeekRowArr,
  }
  return <RecordCallbacksContext.Provider value={value}>{children}</RecordCallbacksContext.Provider>
}
