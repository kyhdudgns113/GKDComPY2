import {useCallback, useEffect, useState} from 'react'

import {Icon} from '@component'
import {useClubStates} from '@store'

import {ClubRowDiscuss} from './ClubRowDiscuss'
import {ClubRowMember} from './ClubRowMember'
import {ClubRowRecord} from './ClubRowRecord'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowProps = DivCommonProps & {
  club: ClubType
}

export const ClubRow: FC<ClubRowProps> = ({club, className, style, ...props}) => {
  const {clubOpened} = useClubStates()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const onClickRow = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsOpen(prev => !prev)
  }, [])

  // 초기화: isSelected
  useEffect(() => {
    if (clubOpened.clubOId === club.clubOId) {
      setIsSelected(true)
    } // ::
    else {
      setIsSelected(false)
    }
  }, [clubOpened, club])

  return (
    <div
      className={`Club_Row _row _row_club ${className || ''}`}
      style={style}
      {...props} // ::
    >
      <div className="_title_container_row" onClick={onClickRow}>
        {/* 0. 선택 여부 아이콘 */}
        <Icon className={`_selected_padding ${isSelected ? '_selected' : '_unselected'}`} iconName="arrow_right_alt" />

        {/* 1. 타이틀 (클럽명) */}
        <p className={`_title_row`}>{`${club.clubName}`}</p>

        {/* 3. 토글 버튼 */}
        <Icon className="_button_toggle_row" iconName={isOpen ? 'arrow_drop_down' : 'arrow_right'} />
      </div>

      {isOpen && <ClubRowDiscuss club={club} />}
      {isOpen && <ClubRowMember club={club} />}
      {isOpen && <ClubRowRecord club={club} />}
    </div>
  )
}
