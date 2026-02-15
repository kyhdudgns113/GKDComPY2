import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_ScoreBody.scss'

type ScoreBodyGroupProps = TableBodyCommonProps & {
  weekRow: WeekRowType
}

/* eslint-disable */
export const ScoreBodyGroup: FC<ScoreBodyGroupProps> = ({weekRow, className, style, ...props}) => {
  return (
    <tbody className={`ScoreBody_Group ${className || ''}`} style={style} {...props}>
      <tr>
        <td className="_td_club_name">-</td>
        <td>-</td>
      </tr>
    </tbody>
  )
}
