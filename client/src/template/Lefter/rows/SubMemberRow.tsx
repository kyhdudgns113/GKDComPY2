import {useCallback, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {Icon} from '@component'
import {useCommunityStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

type SubMemberRowProps = DivCommonProps & {}

export const SubMemberRow: FC<SubMemberRowProps> = ({className, style, ...props}) => {
  const {community} = useCommunityStates()
  const location = useLocation()
  const navigate = useNavigate()

  const [isSelected, setIsSelected] = useState<boolean>(false)

  const onClickRow = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      navigate(`/client/club/member/${community.subClubOId}`)
    },
    [community] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // 초기화: 이 페이지 선택되었는지 여부
  useEffect(() => {
    if (location.pathname.includes(`/client/club/member/${community.subClubOId}`)) {
      setIsSelected(true)
    } // ::
    else {
      setIsSelected(false)
    }
  }, [community, location])
  return (
    <div className={`SubMember_Row _row ${className || ''}`} onClick={onClickRow} style={style} {...props}>
      {/* 0. 선택 여부 아이콘 */}
      <Icon className={`_selected_padding ${isSelected ? '_selected' : '_unselected'}`} iconName="arrow_right_alt" />

      {/* 1. 타이틀 */}
      <p className="_title_row">후보군 멤버</p>
    </div>
  )
}
