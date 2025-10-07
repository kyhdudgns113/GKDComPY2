import {createContext, useContext, useState} from 'react'

import type {FC, PropsWithChildren} from 'react'
import type {Setter} from '@type'

// prettier-ignore
type ContextType = {
  userId: string, setUserId: Setter<string>,
}
// prettier-ignore
export const AuthStatesContext = createContext<ContextType>({
  userId: '', setUserId: () => {},
})

export const useAuthStatesContext = () => useContext(AuthStatesContext)

export const AuthStatesProvider: FC<PropsWithChildren> = ({children}) => {
  const [userId, setUserId] = useState<string>('')

  // prettier-ignore
  const value: ContextType = {
    userId, setUserId,
  }

  return <AuthStatesContext.Provider value={value}>{children}</AuthStatesContext.Provider>
}
