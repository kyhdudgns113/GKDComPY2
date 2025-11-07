import {useCallback} from 'react'

import {useDocumentCallbacksContext} from '@context'
import {useCommunityStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import './LoadButton.scss'

type LoadButtonProps = ButtonCommonProps & {}

export const LoadButton: FC<LoadButtonProps> = ({className, ...props}) => {
  const {community} = useCommunityStates()
  const {loadCommDocument} = useDocumentCallbacksContext()

  const onClickLoad = useCallback(
    (commOId: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      loadCommDocument(commOId) // ::
        .then(res => {
          if (res) {
            alert('불러오기 완료!')
          }
        })
    },
    [loadCommDocument]
  )

  return (
    <button className={`Load_Button ${className || ''}`} onClick={onClickLoad(community.commOId)} {...props}>
      로드
    </button>
  )
}
