import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowMemberProps = DivCommonProps & {
  club: ClubType
}

export const ClubRowMember: FC<ClubRowMemberProps> = ({club, className, style, ...props}) => {
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      navigate(`/client/club/member/${club.clubOId}`)
    },
    [club] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div
      className={`ClubRowMember _part_row_club ${className || ''}`}
      style={style}
      onClick={onClickRow}
      {...props} // ::
    >
      <p className="_title_row_part">{`- 클럽 멤버`}</p>
    </div>
  )
}
