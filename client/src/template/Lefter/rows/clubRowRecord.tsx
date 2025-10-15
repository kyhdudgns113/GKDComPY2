import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowRecordProps = DivCommonProps & {
  club: ClubType
}

export const ClubRowRecord: FC<ClubRowRecordProps> = ({club, className, style, ...props}) => {
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      navigate(`/client/club/record/${club.clubOId}`)
    },
    [club] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div
      className={`ClubRowRecord _part_row_club ${className || ''}`}
      style={style}
      onClick={onClickRow}
      {...props} // ::
    >
      <p className="_title_row_part">{`- 대전기록`}</p>
    </div>
  )
}
