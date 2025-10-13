import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowDiscussProps = DivCommonProps & {
  club: ClubType
}

export const ClubRowDiscuss: FC<ClubRowDiscussProps> = ({club, className, style, ...props}) => {
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      navigate(`/client/club/discuss/${club.clubOId}`)
    },
    [club] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div
      className={`ClubRowDiscuss _part_row_club ${className || ''}`}
      onClick={onClickRow}
      style={style}
      {...props} // ::
    >
      <p className="_title_row_part">{`- 회의록`}</p>
    </div>
  )
}
