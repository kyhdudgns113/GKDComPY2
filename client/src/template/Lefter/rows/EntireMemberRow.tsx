import {useCallback, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {Icon} from '@component'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

type EntireMemberRowProps = DivCommonProps & {}

export const EntireMemberRow: FC<EntireMemberRowProps> = ({className, style, ...props}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const location = useLocation()
  const navigate = useNavigate()

  const onClickRow = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate('/client/entireMember')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 초기화: 이 페이지 선택되었는지 여부
  useEffect(() => {
    if (location.pathname.includes('/client/entireMember')) {
      setIsSelected(true)
    } // ::
    else {
      setIsSelected(false)
    }
  }, [location])

  return (
    <div className={`EntireMember_Row _row ${className || ''}`} onClick={onClickRow} style={style} {...props}>
      {/* 0. 선택 여부 아이콘 */}
      <Icon className={`_selected_padding ${isSelected ? '_selected' : '_unselected'}`} iconName="arrow_right_alt" />

      {/* 1. 타이틀 */}
      <p className="_title_row">전체 멤버</p>
    </div>
  )
}
