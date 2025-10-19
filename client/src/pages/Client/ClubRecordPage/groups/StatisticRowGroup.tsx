import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_StatisticRow.scss'

type StatisticRowGroupProps = TableRowCommonProps & {
  weekRow: WeekRowType
}

export const StatisticRowGroup: FC<StatisticRowGroupProps> = ({weekRow, className, style, ...props}) => {
  const {weekOId} = weekRow

  return (
    <>
      {/* 0행 */}
      <tr className={`StatisticRow_Group ROW_0 ${weekOId} ${className || ''}`} style={style} {...props}>
        {/* 1. 0~4 열: 주간 통계 */}
        <td className="td_statistic_total _total _bold td_br_2">컨</td>
        <td className="td_draw_total _total _bold td_br_2">무</td>
        <td className="td_lose_total _total _bold td_br_2">패</td>
        <td className="td_miss_total _total _bold td_br_2">미</td>
        <td className="td_comments_total _total _bold td_br_4">V</td>
        {/* 2. 5~8 열: 구분선 */}
        <td className="td_separator td_br_6" rowSpan={2} colSpan={4}>
          {`주간 / 일간`}
        </td>
        {/* 3. 9~13 열: 월요일 */}
        <td className="td_separator td_br_4" rowSpan={2} colSpan={5}>
          {`월요일`}
        </td>
        {/* 4. 14~18 열: 화요일 */}
        <td className="td_separator td_br_4" rowSpan={2} colSpan={5}>
          {`화요일`}
        </td>
        {/* 5. 19~23 열: 수요일 */}
        <td className="td_separator td_br_4" rowSpan={2} colSpan={5}>
          {`수요일`}
        </td>
        {/* 6. 24~28 열: 목요일 */}
        <td className="td_separator td_br_4" rowSpan={2} colSpan={5}>
          {`목요일`}
        </td>
        {/* 7. 29~33 열: 금요일 */}
        <td className="td_separator td_br_4" rowSpan={2} colSpan={5}>
          {`금요일`}
        </td>
        {/* 8. 34~38 열: 토요일 */}
        <td className="td_separator" rowSpan={2} colSpan={5}>
          {`토요일`}
        </td>
      </tr>
      {/* 1행 */}
      <tr className={`StatisticRow_Group ROW_1 ${weekOId} ${className || ''}`} style={style} {...props}>
        <td className="td_statistic_total _total td_br_2">컨</td>
        <td className="td_draw_total _total td_br_2">무</td>
        <td className="td_lose_total _total td_br_2">패</td>
        <td className="td_miss_total _total td_br_2">미</td>
        <td className="td_comments_total _total td_br_4">V</td>
      </tr>
    </>
  )
}
