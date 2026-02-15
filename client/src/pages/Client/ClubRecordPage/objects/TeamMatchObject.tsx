import {MatchBodyGroup, MatchHeaderGroup} from '../groups'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Obj_TeamMatch.scss'

import * as ST from '@shareType'

type TeamMatchObjectProps = DivCommonProps & {
  weekRow: ST.WeekRowType
}

/* eslint-disable */
export const TeamMatchObject: FC<TeamMatchObjectProps> = ({weekRow, ...props}) => {
  return (
    <div className={`TeamMatch_Object `} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_object">매치 결과</p>

      {/* 2. 대전 결과 표 */}
      <table>
        <MatchHeaderGroup weekRow={weekRow} />
        <MatchBodyGroup weekRow={weekRow} />
      </table>
    </div>
  )
}
