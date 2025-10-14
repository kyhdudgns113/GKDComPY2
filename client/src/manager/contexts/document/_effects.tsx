import {createContext, useContext, useEffect} from 'react'

import {useDocumentCallbacksContext} from '@context'
import {useAppDispatch, useClubStates, useDocumentActions} from '@store'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const DocumentEffectsContext = createContext<ContextType>({})

export const useDocumentEffectsContext = () => useContext(DocumentEffectsContext)

export const DocumentEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {clubOpened} = useClubStates()
  const {loadClubDocument} = useDocumentCallbacksContext()
  const {resetDocContents} = useDocumentActions()

  const dispatch = useAppDispatch()

  // 초기화: 문서 내용 불러오기
  useEffect(() => {
    if (!clubOpened || clubOpened.clubOId === '') {
      return
    }

    loadClubDocument(clubOpened.clubOId)

    return () => {
      dispatch(resetDocContents())
    }
  }, [clubOpened, loadClubDocument, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return <DocumentEffectsContext.Provider value={{}}>{children}</DocumentEffectsContext.Provider>
}
