import {useAppSelector} from '@store'
import {selectCommClubArr} from '@store'

import {AddClubButton} from '../buttons'
import {ClubRowGroup} from '../groups'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/CommClubListObject.scss'

type CommClubListObjectProps = DivCommonProps & {}

export const CommClubListObject: FC<CommClubListObjectProps> = ({className, style, ...props}) => {
  const commClubArr = useAppSelector(selectCommClubArr)

  return (
    <div className={`CommClubList_Object ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_object">클럽 목록: {commClubArr.length}개</p>

      {/* 2. 클럽 추가 버튼 */}
      <AddClubButton />

      {/* 3. 클럽 목록 */}
      <div className="_club_arr_container_object">
        {commClubArr.map((club, clubIdx) => (
          <ClubRowGroup key={clubIdx} club={club} />
        ))}
      </div>
    </div>
  )
}
