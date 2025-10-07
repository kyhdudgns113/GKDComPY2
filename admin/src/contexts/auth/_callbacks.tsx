import {createContext, useCallback, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthStatesContext} from './__states'

import type {FC, PropsWithChildren} from 'react'
import type {AuthBodyType} from '@type'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as NV from '@nullValue'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  refreshToken: () => Promise<void>
  signIn: (userId: string, password: string) => Promise<boolean>
  signOut: () => void
  signUp: (userId: string, password: string) => Promise<boolean>
}
// prettier-ignore
export const AuthCallbacksContext = createContext<ContextType>({
  refreshToken: () => Promise.resolve(),
  signIn: () => Promise.resolve(false),
  signOut: () => {},
  signUp: () => Promise.resolve(false),
})

export const useAuthCallbacksContext = () => useContext(AuthCallbacksContext)

export const AuthCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const {setUserId} = useAuthStatesContext()

  const navigate = useNavigate()

  const _writeAuthBodyObject = useCallback(
    async (body: AuthBodyType, callback?: () => void) => {
      await U.writeStringP('jwtFromServer', body.jwtFromServer)
      await U.writeStringP('userId', body.userId)

      setUserId(body.userId)

      if (callback) {
        callback()
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // AREA2: 외부에서 사용할 함수
  const refreshToken = useCallback(
    async () => {
      const isJwt = await U.readStringP('jwtFromServer')
      if (isJwt) {
        const url = `/client/auth/refreshToken`
        return F.getWithJwt(url)
          .then(res => res.json())
          .then(res => {
            const {ok, body, statusCode, gkdErrMsg, message, jwtFromServer} = res
            if (ok) {
              // getWithJwt 에서 토큰 갱신을 한다.
              const {userId} = body.user
              const authBody: AuthBodyType = {
                jwtFromServer,
                userId
              }
              _writeAuthBodyObject(authBody)
            } // ::
            else {
              _writeAuthBodyObject(NV.NULL_AUTH_BODY())
              U.alertErrMsg(url, statusCode, gkdErrMsg, message)
            }
          })
          .catch(errObj => {
            U.alertErrors(url, errObj)
            _writeAuthBodyObject(NV.NULL_AUTH_BODY())
            navigate('/')
          })
      } // ::
      else {
        await _writeAuthBodyObject(NV.NULL_AUTH_BODY())
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const signIn = useCallback(
    async (userId: string, password: string) => {
      const url = `/client/auth/signIn`
      const data: HTTP.SignInDataType = {userId, password}

      return F.post(url, data, '')
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message, jwtFromServer} = res

          if (ok) {
            const {userId} = body.user
            const authBody: AuthBodyType = {
              jwtFromServer,
              userId
            }
            _writeAuthBodyObject(authBody)
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
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const signOut = useCallback(() => {
    _writeAuthBodyObject(NV.NULL_AUTH_BODY())
    navigate('/')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const signUp = useCallback(
    async (userId: string, password: string) => {
      const url = `/client/auth/signUp`
      const data: HTTP.SignUpDataType = {userId, password}

      return F.post(url, data, '')
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message, jwtFromServer} = res

          if (ok) {
            const {userId} = body.user
            const authBody: AuthBodyType = {
              jwtFromServer,
              userId
            }
            _writeAuthBodyObject(authBody)
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
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )
  // prettier-ignore
  const value: ContextType = {
    refreshToken,
    signIn,
    signOut,
    signUp,
  }
  return <AuthCallbacksContext.Provider value={value}>{children}</AuthCallbacksContext.Provider>
}
