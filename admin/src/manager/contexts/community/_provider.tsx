import {CommunityStatesProvider} from './__states'
import {CommunityCallbacksProvider} from './_callbacks'
import {CommunityEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const CommunityProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <CommunityStatesProvider>
      <CommunityCallbacksProvider>
        <CommunityEffectsProvider>{children}</CommunityEffectsProvider>
      </CommunityCallbacksProvider>
    </CommunityStatesProvider>
  )
}
