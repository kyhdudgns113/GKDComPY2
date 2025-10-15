import {createContext, useContext, useEffect} from 'react'

import {useSocketCallbacksContext, useSocketStatesContext} from '@context'

import {useAuthStatesContext} from './__states'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const AuthEffectsContext = createContext<ContextType>({})

export const useAuthEffectsContext = () => useContext(AuthEffectsContext)

export const AuthEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {socket} = useSocketStatesContext()
  const {connectSocket, disconnectSocket} = useSocketCallbacksContext()
  const {userOId, setSocketValidated} = useAuthStatesContext()

  // 초기화: 소켓 연결
  useEffect(() => {
    if (userOId) {
      connectSocket(socket, userOId, setSocketValidated)
    } // ::
    else {
      disconnectSocket(socket)
    }
  }, [socket, userOId]) // eslint-disable-line react-hooks/exhaustive-deps
  // ::
  return <AuthEffectsContext.Provider value={{}}>{children}</AuthEffectsContext.Provider>
}
