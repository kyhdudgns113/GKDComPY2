import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_MatchBody.scss'

type MatchBodyGroupProps = TableBodyCommonProps & {
  weekRow: WeekRowType
}

/* eslint-disable */
export const MatchBodyGroup: FC<MatchBodyGroupProps> = ({weekRow, className, style, ...props}) => {
  return (
    <tbody className={`MatchBody_Group ${className || ''}`} style={style} {...props}>
      <tr>
        <td>-</td>
      </tr>
    </tbody>
  )
}
