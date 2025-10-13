import {DocumentStatesProvider} from './__states'
import {DocumentCallbacksProvider} from './_callbacks'
import {DocumentEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const DocumentProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <DocumentStatesProvider>
      <DocumentCallbacksProvider>
        <DocumentEffectsProvider>{children}</DocumentEffectsProvider>
      </DocumentCallbacksProvider>
    </DocumentStatesProvider>
  )
}
