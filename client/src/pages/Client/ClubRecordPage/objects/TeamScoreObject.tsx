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
      TeamScoreObject
    </div>
  )
}
