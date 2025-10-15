import {useCallback, useState} from 'react'

import {Icon} from '@component'

import {ClubRowDiscuss} from './ClubRowDiscuss'
import {ClubRowMember} from './ClubRowMember'
import {ClubRowRecord} from './clubRowRecord'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowProps = DivCommonProps & {
  club: ClubType
}

export const ClubRow: FC<ClubRowProps> = ({club, className, style, ...props}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClickRow = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div
      className={`Club_Row _row _row_club ${className || ''}`}
      style={style}
      {...props} // ::
    >
      <div className="_title_container_row" onClick={onClickRow}>
        {/* 1. 타이틀 (클럽명) */}
        <p className="_title_row">{`- 클럽: ${club.clubName}`}</p>

        {/* 2. 토글 버튼 */}
        <Icon className="_button_toggle_row" iconName={isOpen ? 'arrow_drop_down' : 'arrow_right'} />
      </div>

      {isOpen && <ClubRowDiscuss club={club} />}
      {isOpen && <ClubRowMember club={club} />}
      {isOpen && <ClubRowRecord club={club} />}
    </div>
  )
}
