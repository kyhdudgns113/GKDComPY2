import {MemberStatesProvider} from './__states'
import {MemberCallbacksProvider} from './_callbacks'
import {MemberEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const MemberProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <MemberStatesProvider>
      <MemberCallbacksProvider>
        <MemberEffectsProvider>{children}</MemberEffectsProvider>
      </MemberCallbacksProvider>
    </MemberStatesProvider>
  )
}
