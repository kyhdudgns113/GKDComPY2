import {ClubStatesProvider} from './__states'
import {ClubCallbacksProvider} from './_callbacks'
import {ClubEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const ClubProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <ClubStatesProvider>
      <ClubCallbacksProvider>
        <ClubEffectsProvider>{children}</ClubEffectsProvider>
      </ClubCallbacksProvider>
    </ClubStatesProvider>
  )
}
