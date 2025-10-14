import {createContext, useContext, useState} from 'react'

import type {FC, PropsWithChildren} from 'react'
import type {Setter} from '@type'
import {AUTH_NORMAL} from '@secret'

// prettier-ignore
type ContextType = {
  commAuth: number, setCommAuth: Setter<number>,
  commOId: string, setCommOId: Setter<string>,
  socketValidated: boolean, setSocketValidated: Setter<boolean>,
  userId: string, setUserId: Setter<string>,
  userOId: string, setUserOId: Setter<string>,
}
// prettier-ignore
export const AuthStatesContext = createContext<ContextType>({
  commAuth: AUTH_NORMAL, setCommAuth: () => {},
  commOId: '', setCommOId: () => {},
  socketValidated: false, setSocketValidated: () => {},
  userId: '', setUserId: () => {},
  userOId: '', setUserOId: () => {},
})

export const useAuthStatesContext = () => useContext(AuthStatesContext)

export const AuthStatesProvider: FC<PropsWithChildren> = ({children}) => {
  const [commAuth, setCommAuth] = useState<number>(AUTH_NORMAL)
  const [commOId, setCommOId] = useState<string>('')
  const [socketValidated, setSocketValidated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [userOId, setUserOId] = useState<string>('')

  // prettier-ignore
  const value: ContextType = {
    commAuth, setCommAuth,
    commOId, setCommOId,
    socketValidated, setSocketValidated,
    userId, setUserId,
    userOId, setUserOId,
  }

  return <AuthStatesContext.Provider value={value}>{children}</AuthStatesContext.Provider>
}
