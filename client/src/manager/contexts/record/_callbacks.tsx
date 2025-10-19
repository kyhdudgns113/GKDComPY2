import {useAppDispatch, useRecordActions} from '@store'
import {createContext, useCallback, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  addNextWeek: (clubOId: string) => Promise<boolean>
  addPrevWeek: (clubOId: string) => Promise<boolean>

  modifyDailyInfo: (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string) => Promise<boolean>
  modifyWeeklyInfo: (weekOId: string, weekComments: string) => Promise<boolean>

  loadClubWeekRowArr: (clubOId: string) => Promise<boolean>
  loadWeeklyRecordInfo: (weekOId: string) => Promise<boolean>

  removeWeekRow: (weekOId: string) => Promise<boolean>
}
// prettier-ignore
export const RecordCallbacksContext = createContext<ContextType>({
  addNextWeek: async () => false,
  addPrevWeek: async () => false,

  modifyDailyInfo: async () => false,
  modifyWeeklyInfo: async () => false,

  loadClubWeekRowArr: async () => false,
  loadWeeklyRecordInfo: async () => false,

  removeWeekRow: async () => false,
})

export const useRecordCallbacksContext = () => useContext(RecordCallbacksContext)

export const RecordCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const dispatch = useAppDispatch()
  const {setDailyRecordMapFromArr, setDateInfoArrFromArr, setRowMemberArr, setWeekRowArr} = useRecordActions()

  // POST AREA:

  const addNextWeek = useCallback(
    async (clubOId: string) => {
      const url = `/client/record/addNextWeek`
      const data: HTTP.AddNextWeekDataType = {clubOId}
      return F.postWithJwt(url, data)
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

  const addPrevWeek = useCallback(
    async (clubOId: string) => {
      const url = `/client/record/addPrevWeek`
      const data: HTTP.AddPrevWeekDataType = {clubOId}
      return F.postWithJwt(url, data)
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

  // PUT AREA:

  const modifyDailyInfo = useCallback(
    async (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string) => {
      const url = `/client/record/modifyDailyInfo`
      const data: HTTP.ModifyDailyInfoDataType = {weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments}
      return F.putWithJwt(url, data)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {dateInfoArr} = body
            dispatch(setDateInfoArrFromArr(dateInfoArr))
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

  const modifyWeeklyInfo = useCallback(
    async (weekOId: string, weekComments: string) => {
      const url = `/client/record/modifyWeeklyInfo`
      const data: HTTP.ModifyWeeklyInfoDataType = {weekOId, weekComments}
      return F.putWithJwt(url, data)
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

  // GET AREA:

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

  const loadWeeklyRecordInfo = useCallback(
    async (weekOId: string) => {
      const url = `/client/record/loadWeeklyRecordInfo/${weekOId}`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {dailyRecordArr, dateInfoArr, rowMemberArr} = body
            dispatch(setDailyRecordMapFromArr(dailyRecordArr))
            dispatch(setDateInfoArrFromArr(dateInfoArr))
            dispatch(setRowMemberArr(rowMemberArr))
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

  // DELETE AREA:

  const removeWeekRow = useCallback(
    async (weekOId: string) => {
      const url = `/client/record/removeWeekRow/${weekOId}`
      return F.delWithJwt(url)
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
    addNextWeek,
    addPrevWeek,

    modifyDailyInfo,
    modifyWeeklyInfo,

    loadClubWeekRowArr,
    loadWeeklyRecordInfo,

    removeWeekRow,
  }
  return <RecordCallbacksContext.Provider value={value}>{children}</RecordCallbacksContext.Provider>
}
