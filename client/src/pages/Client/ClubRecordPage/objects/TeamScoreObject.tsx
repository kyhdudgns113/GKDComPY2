import {ScoreBodyGroup, ScoreHeaderGroup} from '../groups'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Obj_TeamScore.scss'

import * as ST from '@shareType'

type TeamScoreObjectProps = DivCommonProps & {
  weekRow: ST.WeekRowType
}

/* eslint-disable */
export const TeamScoreObject: FC<TeamScoreObjectProps> = ({weekRow, ...props}) => {
  return (
    <div className={`TeamScore_Object `} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_object">팀 점수</p>

      {/* 2. 팀 점수 표 */}
      <table>
        <ScoreHeaderGroup weekRow={weekRow} />
        <ScoreBodyGroup weekRow={weekRow} />
      </table>
    </div>
  )
}
