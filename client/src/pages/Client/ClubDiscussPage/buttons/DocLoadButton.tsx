import {useCallback} from 'react'

import {useDocumentCallbacksContext} from '@context'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type DocLoadButtonProps = DivCommonProps & {
  club: ClubType
}

export const DocLoadButton: FC<DocLoadButtonProps> = ({club, className, style, ...props}) => {
  const {loadClubDocument} = useDocumentCallbacksContext()

  const onClickLoad = useCallback(
    (club: ClubType) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      loadClubDocument(club.clubOId) // ::
        .then(res => {
          if (res) {
            alert('클럽 문서 불러오기 성공')
          }
        })
    },
    [loadClubDocument]
  )

  return (
    <div
      className={`DocLoad_Button ${className || ''}`}
      onClick={onClickLoad(club)}
      style={style}
      {...props} // ::
    >
      로드
    </div>
  )
}
