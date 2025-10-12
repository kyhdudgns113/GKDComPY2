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
  refreshToken: () => Promise<boolean>
  signIn: (userId: string, password: string) => Promise<boolean>
  signOut: () => void
}
// prettier-ignore
export const AuthCallbacksContext = createContext<ContextType>({
  refreshToken: () => Promise.resolve(false),
  signIn: () => Promise.resolve(false),
  signOut: () => {},
})

export const useAuthCallbacksContext = () => useContext(AuthCallbacksContext)

export const AuthCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  const {setUserId, setUserOId} = useAuthStatesContext()

  const navigate = useNavigate()

  const _writeAuthBodyObject = useCallback(
    async (authBody: AuthBodyType, callback?: () => void) => {
      await U.writeStringP('jwtFromServer', authBody.jwtFromServer)
      await U.writeStringP('userId', authBody.userId)
      await U.writeStringP('userOId', authBody.userOId)

      setUserId(authBody.userId)
      setUserOId(authBody.userOId)

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
              const {userId, userOId} = body.user
              const authBody: AuthBodyType = {
                jwtFromServer,
                userId,
                userOId
              }
              _writeAuthBodyObject(authBody)
              return true
            } // ::
            else {
              _writeAuthBodyObject(NV.NULL_AUTH_BODY())
              U.alertErrMsg(url, statusCode, gkdErrMsg, message)
              return false
            }
          })
          .catch(errObj => {
            U.alertErrors(url, errObj)
            _writeAuthBodyObject(NV.NULL_AUTH_BODY())
            return false
          })
      } // ::
      else {
        await _writeAuthBodyObject(NV.NULL_AUTH_BODY())
        return Promise.resolve(false)
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
            const {userId, userOId} = body.user
            const authBody: AuthBodyType = {
              jwtFromServer,
              userId,
              userOId
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
  // prettier-ignore
  const value: ContextType = {
    refreshToken,
    signIn,
    signOut,
  }
  return <AuthCallbacksContext.Provider value={value}>{children}</AuthCallbacksContext.Provider>
}
