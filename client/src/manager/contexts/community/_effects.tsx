import {createContext, useContext, useEffect} from 'react'
import {useAuthStatesContext} from '@context'

import {useCommunityCallbacksContext} from './_callbacks'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const CommunityEffectsContext = createContext<ContextType>({})

export const useCommunityEffectsContext = () => useContext(CommunityEffectsContext)

export const CommunityEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {userOId} = useAuthStatesContext()
  const {loadUsersCommunity} = useCommunityCallbacksContext()

  useEffect(() => {
    if (userOId) {
      loadUsersCommunity()
    }
  }, [userOId, loadUsersCommunity])

  //
  return <CommunityEffectsContext.Provider value={{}}>{children}</CommunityEffectsContext.Provider>
}
