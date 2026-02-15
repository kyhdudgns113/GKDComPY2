import type {FC} from 'react'
import type {TableHeadCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_MatchHeader.scss'
import {useGetEnemyClubName} from '@store'

type MatchHeaderGroupProps = TableHeadCommonProps & {
  weekRow: WeekRowType
}

/* eslint-disable */
export const MatchHeaderGroup: FC<MatchHeaderGroupProps> = ({weekRow, className, style, ...props}) => {
  const getEnemyClubName = useGetEnemyClubName()

  return (
    <thead className={`MatchHeader_Group ${className || ''}`} style={style} {...props}>
      <tr>
        <th className="_th_category">클럽명</th>
        <th>{getEnemyClubName(-1)}</th>
        <th>{getEnemyClubName(0)}</th>
        <th>{getEnemyClubName(1)}</th>
        <th>{getEnemyClubName(2)}</th>
        <th>{getEnemyClubName(3)}</th>
        <th>{getEnemyClubName(4)}</th>
      </tr>
    </thead>
  )
}
