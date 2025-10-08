import {LogStatesProvider} from './__states'
import {LogCallbacksProvider} from './_callbacks'
import {LogEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const LogProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <LogStatesProvider>
      <LogCallbacksProvider>
        <LogEffectsProvider>{children}</LogEffectsProvider>
      </LogCallbacksProvider>
    </LogStatesProvider>
  )
}
