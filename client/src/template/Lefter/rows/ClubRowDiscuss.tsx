import {useCallback, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {Icon} from '@component'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowDiscussProps = DivCommonProps & {
  club: ClubType
}

export const ClubRowDiscuss: FC<ClubRowDiscussProps> = ({club, className, style, ...props}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const location = useLocation()
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      navigate(`/client/club/discuss/${club.clubOId}`)
    },
    [club] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // 초기화: 이 페이지 선택되었는지 여부
  useEffect(() => {
    if (location.pathname.includes(`/client/club/discuss/${club.clubOId}`)) {
      setIsSelected(true)
    } // ::
    else {
      setIsSelected(false)
    }
  }, [club, location])

  return (
    <div
      className={`ClubRowDiscuss _part_row_club ${className || ''}`}
      onClick={onClickRow}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_row_part">{`:: 회의록`}</p>

      {/* 2. 선택 여부 아이콘 */}
      {isSelected && <Icon className="_icon_selected" iconName="search" />}
    </div>
  )
}
