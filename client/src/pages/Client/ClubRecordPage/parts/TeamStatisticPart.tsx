import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as ST from '@shareType'

import '../_styles/Part_TeamStatistic.scss'

type TeamStatisticPartProps = DivCommonProps & {
  weekRow: ST.WeekRowType
}

/* eslint-disable */
export const TeamStatisticPart: FC<TeamStatisticPartProps> = ({weekRow, ...props}) => {
  return (
    <div className={`TeamStatistic_Part `} {...props}>
      <p>TeamStatisticPart</p>
    </div>
  )
}
