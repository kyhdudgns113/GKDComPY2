import type {FC} from 'react'
import type {TableHeadCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_ScoreHeader.scss'

type ScoreHeaderGroupProps = TableHeadCommonProps & {
  weekRow: WeekRowType
}

/* eslint-disable */
export const ScoreHeaderGroup: FC<ScoreHeaderGroupProps> = ({weekRow, className, style, ...props}) => {
  return (
    <thead className={`ScoreHeader_Group ${className || ''}`} style={style} {...props}>
      <tr>
        <th className="_th_category">클럽명</th>
        <th>승</th>
        <th>무</th>
        <th>패</th>
        <th>트로피</th>
        <th>점수</th>
      </tr>
    </thead>
  )
}
