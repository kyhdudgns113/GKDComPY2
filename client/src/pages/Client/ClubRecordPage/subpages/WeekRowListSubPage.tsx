import {AddNextWeekButton, AddPrevWeekButton} from '../buttons'

import {WeekRowArrPart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/SP_WeekRowList.scss'

type WeekRowListSubPageProps = DivCommonProps & {}

export const WeekRowListSubPage: FC<WeekRowListSubPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`WeekRowList_SubPage ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 블록 */}
      <div className="_title_block_subpage">
        <p className="_title_subpage">주차별 기록</p>
      </div>

      {/* 2. 버튼: 새 주차 생성 */}
      <AddNextWeekButton />

      {/* 3. 목록: 주차 목록 */}
      <WeekRowArrPart />

      {/* 4. 버튼: 이전 주차 생성 */}
      <AddPrevWeekButton />
    </div>
  )
}
