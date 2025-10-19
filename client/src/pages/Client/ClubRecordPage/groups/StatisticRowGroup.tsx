import {getWeeklyStatisticArr} from '@store'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_StatisticRow.scss'
import {useAppSelector} from '@store'

type StatisticRowGroupProps = TableRowCommonProps & {
  weekRow: WeekRowType
}

export const StatisticRowGroup: FC<StatisticRowGroupProps> = ({weekRow, className, style, ...props}) => {
  const {weekOId} = weekRow

  const {sumDraw, sumLose, sumMiss, sumCond} = useAppSelector(state => getWeeklyStatisticArr(state))
  const statisticArr = useAppSelector(state => state.Record.statisticArr)

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
        <td className="_total _bold td_br_2">컨</td>
        <td className="_total _bold td_br_2">무</td>
        <td className="_total _bold td_br_2">패</td>
        <td className="_total _bold td_br_2">미</td>
        <td className="_total _bold td_br_4">V</td>
        {/* 4. 14~18 열: 화요일 */}
        <td className="_total _bold td_br_2">컨</td>
        <td className="_total _bold td_br_2">무</td>
        <td className="_total _bold td_br_2">패</td>
        <td className="_total _bold td_br_2">미</td>
        <td className="_total _bold td_br_4">V</td>
        {/* 5. 19~23 열: 수요일 */}
        <td className="_total _bold td_br_2">컨</td>
        <td className="_total _bold td_br_2">무</td>
        <td className="_total _bold td_br_2">패</td>
        <td className="_total _bold td_br_2">미</td>
        <td className="_total _bold td_br_4">V</td>
        {/* 6. 24~28 열: 목요일 */}
        <td className="_total _bold td_br_2">컨</td>
        <td className="_total _bold td_br_2">무</td>
        <td className="_total _bold td_br_2">패</td>
        <td className="_total _bold td_br_2">미</td>
        <td className="_total _bold td_br_4">V</td>
        {/* 7. 29~33 열: 금요일 */}
        <td className="_total _bold td_br_2">컨</td>
        <td className="_total _bold td_br_2">무</td>
        <td className="_total _bold td_br_2">패</td>
        <td className="_total _bold td_br_2">미</td>
        <td className="_total _bold td_br_4">V</td>
        {/* 8. 34~38 열: 토요일 */}
        <td className="_total _bold td_br_2">컨</td>
        <td className="_total _bold td_br_2">무</td>
        <td className="_total _bold td_br_2">패</td>
        <td className="_total _bold td_br_2">미</td>
        <td className="_total _bold td_br_4">V</td>
      </tr>
      {/* 1행 */}
      <tr className={`StatisticRow_Group ROW_1 ${weekOId} ${className || ''}`} style={style} {...props}>
        {/* 1. 0~4 열: 주간 통계 */}
        <td className="td_statistic_total _total td_br_2">{sumCond}</td>
        <td className="td_draw_total _total td_br_2">{sumDraw}</td>
        <td className="td_lose_total _total td_br_2">{sumLose}</td>
        <td className="td_miss_total _total td_br_2">{sumMiss}</td>
        <td className="td_comments_total _total td_br_4"></td>
        {/* 2. 5~8행 : 건너뛰어짐 */}
        {/* 3. 9~13 열: 월요일 */}
        <td className="_total td_br_2">{statisticArr[0].sumCond > 0 ? statisticArr[0].sumCond : ''}</td>
        <td className="_total td_br_2">{statisticArr[0].sumDraw > 0 ? statisticArr[0].sumDraw : ''}</td>
        <td className="_total td_br_2">{statisticArr[0].sumLose > 0 ? statisticArr[0].sumLose : ''}</td>
        <td className="_total td_br_2">{statisticArr[0].sumMiss > 0 ? statisticArr[0].sumMiss : ''}</td>
        <td className="_total td_br_4"></td>
        {/* 4. 14~18 열: 화요일 */}
        <td className="_total td_br_2">{statisticArr[1].sumCond > 0 ? statisticArr[1].sumCond : ''}</td>
        <td className="_total td_br_2">{statisticArr[1].sumDraw > 0 ? statisticArr[1].sumDraw : ''}</td>
        <td className="_total td_br_2">{statisticArr[1].sumLose > 0 ? statisticArr[1].sumLose : ''}</td>
        <td className="_total td_br_2">{statisticArr[1].sumMiss > 0 ? statisticArr[1].sumMiss : ''}</td>
        <td className="_total td_br_4"></td>
        {/* 5. 19~23 열: 수요일 */}
        <td className="_total td_br_2">{statisticArr[2].sumCond > 0 ? statisticArr[2].sumCond : ''}</td>
        <td className="_total td_br_2">{statisticArr[2].sumDraw > 0 ? statisticArr[2].sumDraw : ''}</td>
        <td className="_total td_br_2">{statisticArr[2].sumLose > 0 ? statisticArr[2].sumLose : ''}</td>
        <td className="_total td_br_2">{statisticArr[2].sumMiss > 0 ? statisticArr[2].sumMiss : ''}</td>
        <td className="_total td_br_4"></td>
        {/* 6. 24~28 열: 목요일 */}
        <td className="_total td_br_2">{statisticArr[3].sumCond > 0 ? statisticArr[3].sumCond : ''}</td>
        <td className="_total td_br_2">{statisticArr[3].sumDraw > 0 ? statisticArr[3].sumDraw : ''}</td>
        <td className="_total td_br_2">{statisticArr[3].sumLose > 0 ? statisticArr[3].sumLose : ''}</td>
        <td className="_total td_br_2">{statisticArr[3].sumMiss > 0 ? statisticArr[3].sumMiss : ''}</td>
        <td className="_total td_br_4"></td>
        {/* 7. 29~33 열: 금요일 */}
        <td className="_total td_br_2">{statisticArr[4].sumCond > 0 ? statisticArr[4].sumCond : ''}</td>
        <td className="_total td_br_2">{statisticArr[4].sumDraw > 0 ? statisticArr[4].sumDraw : ''}</td>
        <td className="_total td_br_2">{statisticArr[4].sumLose > 0 ? statisticArr[4].sumLose : ''}</td>
        <td className="_total td_br_2">{statisticArr[4].sumMiss > 0 ? statisticArr[4].sumMiss : ''}</td>
        <td className="_total td_br_4"></td>
        {/* 8. 34~38 열: 토요일 */}
        <td className="_total td_br_2">{statisticArr[5].sumCond > 0 ? statisticArr[5].sumCond : ''}</td>
        <td className="_total td_br_2">{statisticArr[5].sumDraw > 0 ? statisticArr[5].sumDraw : ''}</td>
        <td className="_total td_br_2">{statisticArr[5].sumLose > 0 ? statisticArr[5].sumLose : ''}</td>
        <td className="_total td_br_2">{statisticArr[5].sumMiss > 0 ? statisticArr[5].sumMiss : ''}</td>
        <td className="_total td_br_4"></td>
      </tr>
    </>
  )
}
