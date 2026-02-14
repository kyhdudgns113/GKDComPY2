import type {FC} from 'react'
import type {TableHeadCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_MatchHeader.scss'
import {useClubStates} from '@store'
import {useRecordStates} from '@store'

type MatchHeaderGroupProps = TableHeadCommonProps & {
  weekRow: WeekRowType
}

/* eslint-disable */
export const MatchHeaderGroup: FC<MatchHeaderGroupProps> = ({weekRow, className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {dateInfoArr} = useRecordStates()

  return (
    <thead className={`MatchHeader_Group ${className || ''}`} style={style} {...props}>
      <tr>
        <th className="_th_category">클럽명</th>
        <th>{clubOpened.clubName}</th>
        <th>{dateInfoArr[0].enemyName || '월 상대'}</th>
        <th>{dateInfoArr[1].enemyName || '화 상대'}</th>
        <th>{dateInfoArr[2].enemyName || '수 상대'}</th>
        <th>{dateInfoArr[3].enemyName || '목 상대'}</th>
        <th>{dateInfoArr[4].enemyName || '금 상대'}</th>
      </tr>
    </thead>
  )
}
