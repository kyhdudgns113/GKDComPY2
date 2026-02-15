import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'

import * as ST from '@shareType'

import '../_styles/Grp_ScoreBody.scss'

type ScoreBodyGroupProps = TableBodyCommonProps & {
  weekRow: ST.WeekRowType
}

/* eslint-disable */
export const ScoreBodyGroup: FC<ScoreBodyGroupProps> = ({weekRow, ...props}) => {
  return (
    <tbody className={`ScoreBody_Group `} {...props}>
      <tr>
        <td className="_td_club_name">-</td>
        <td>-</td>
      </tr>
    </tbody>
  )
}
