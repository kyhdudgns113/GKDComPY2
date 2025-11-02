import {useCallback} from 'react'

import {useDocumentCallbacksContext} from '@context'
import {useCommunityStates, useDocumentStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import './SaveButton.scss'

type SaveButtonProps = ButtonCommonProps & {}

export const SaveButton: FC<SaveButtonProps> = ({className, ...props}) => {
  const {community} = useCommunityStates()
  const {docContents} = useDocumentStates()
  const {modifyCommDocument} = useDocumentCallbacksContext()

  const onClickSave = useCallback(
    (commOId: string, contents: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      modifyCommDocument(commOId, contents) // ::
        .then(res => {
          if (res) {
            alert('수정 완료!')
          }
        })
    },
    [modifyCommDocument]
  )

  return (
    <button className={`Save_Button ${className || ''}`} onClick={onClickSave(community.commOId, docContents)} {...props}>
      저장
    </button>
  )
}
