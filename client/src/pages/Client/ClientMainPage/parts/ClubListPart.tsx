import {useCommunityStates} from '@store'

import {AddClubButton} from '../buttons'
import {ClubRowObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/ClubListPart.scss'

type ClubListPartProps = DivCommonProps & {}

export const ClubListPart: FC<ClubListPartProps> = ({className, style, ...props}) => {
  const {clubArr} = useCommunityStates()

  return (
    <div className={`ClubList_Part ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_part">클럽 목록</p>

      {/* 2. 클럽 목록 */}
      <div className="_container_arr_part">
        {clubArr.map((club, clubIdx) => (
          <ClubRowObject key={clubIdx} club={club} />
        ))}
      </div>

      {/* 3. 클럽 추가 버튼 */}
      <AddClubButton />
    </div>
  )
}
