import {useCallback} from 'react'

import {useDocumentCallbacksContext} from '@context'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type DocEditButtonProps = DivCommonProps & {
  club: ClubType
  contents: string
}

export const DocEditButton: FC<DocEditButtonProps> = ({club, contents, className, style, ...props}) => {
  const {modifyClubDocument} = useDocumentCallbacksContext()

  const onClickEdit = useCallback(
    (club: ClubType, contents: string) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      modifyClubDocument(club.clubOId, contents) // ::
        .then(res => {
          if (res) {
            alert('클럽 문서 수정 성공')
          }
        })
    },
    [modifyClubDocument]
  )

  return (
    <div
      className={`DocEdit_Button ${className || ''}`}
      style={style}
      onClick={onClickEdit(club, contents)}
      {...props} // ::
    >
      수정
    </div>
  )
}
