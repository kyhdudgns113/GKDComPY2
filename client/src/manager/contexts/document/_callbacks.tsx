import {createContext, useCallback, useContext} from 'react'

import {useAppDispatch, useDocumentActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  modifyClubDocument: (clubOId: string, contents: string) => Promise<boolean>
  modifyCommDocument: (commOId: string, contents: string) => Promise<boolean>

  loadClubDocument: (clubOId: string) => Promise<boolean>
  loadCommDocument: (commOId: string) => Promise<boolean>
}
// prettier-ignore
export const DocumentCallbacksContext = createContext<ContextType>({
  modifyClubDocument: () => Promise.resolve(false),
  modifyCommDocument: () => Promise.resolve(false),

  loadClubDocument: () => Promise.resolve(false),
  loadCommDocument: () => Promise.resolve(false),
})

export const useDocumentCallbacksContext = () => useContext(DocumentCallbacksContext)

export const DocumentCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const {setDocContents} = useDocumentActions()
  const dispatch = useAppDispatch()

  // PUT AREA:

  const modifyClubDocument = useCallback(async (clubOId: string, contents: string) => {
    const url = `/client/document/modifyClubDocument`
    const data: HTTP.ModifyClubDocDataType = {clubOId, contents}
    return F.putWithJwt(url, data)
      .then(res => res.json())
      .then(res => {
        const {ok, statusCode, gkdErrMsg, message, jwtFromServer} = res
        if (ok) {
          U.writeJwtFromServer(jwtFromServer)
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

  const modifyCommDocument = useCallback(async (commOId: string, contents: string) => {
    const url = `/client/document/modifyCommDocument`
    const data: HTTP.ModifyCommDocDataType = {commOId, contents}
    return F.putWithJwt(url, data)
      .then(res => res.json())
      .then(res => {
        const {ok, statusCode, gkdErrMsg, message, jwtFromServer} = res
        if (ok) {
          U.writeJwtFromServer(jwtFromServer)
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

  // GET AREA:

  const loadClubDocument = useCallback(
    async (clubOId: string) => {
      const url = `/client/document/loadClubDocument/${clubOId}`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message, jwtFromServer} = res

          if (ok) {
            const {contents} = body
            dispatch(setDocContents(contents))
            U.writeJwtFromServer(jwtFromServer)
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

  const loadCommDocument = useCallback(
    async (commOId: string) => {
      const url = `/client/document/loadCommDocument/${commOId}`
      return F.getWithJwt(url)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message, jwtFromServer} = res
          if (ok) {
            const {contents} = body
            dispatch(setDocContents(contents))
            U.writeJwtFromServer(jwtFromServer)
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
    modifyClubDocument,
    modifyCommDocument,

    loadClubDocument,
    loadCommDocument,
  }
  return <DocumentCallbacksContext.Provider value={value}>{children}</DocumentCallbacksContext.Provider>
}
