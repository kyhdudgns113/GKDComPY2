import {createContext, useContext, useEffect} from 'react'
import {useAuthStatesContext} from './__states'

import type {FC, PropsWithChildren} from 'react'
import * as U from '@util'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const AuthEffectsContext = createContext<ContextType>({})

export const useAuthEffectsContext = () => useContext(AuthEffectsContext)

export const AuthEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {setUserId} = useAuthStatesContext()

  useEffect(() => {
    U.readStringP('userId').then(userId => {
      if (userId) {
        setUserId(userId)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // ::
  return <AuthEffectsContext.Provider value={{}}>{children}</AuthEffectsContext.Provider>
}
