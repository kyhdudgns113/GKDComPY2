import {useCallback} from 'react'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_CommentRow.scss'

type CommentRowGroupProps = TableRowCommonProps & {
  weekRow: WeekRowType
}

export const CommentRowGroup: FC<CommentRowGroupProps> = ({weekRow, className, style, ...props}) => {
  const {weekOId} = weekRow

  const BlankComment = useCallback((dayIdx: number) => {
    const dayNameArr = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    const dayName = dayNameArr[dayIdx]

    return <div className="_blank_comment">{`${dayName}\n코멘트`}</div>
  }, [])

  return (
    <tr className={`CommentRow_Group ${weekOId} ${className || ''}`} style={style} {...props}>
      {/* 1. 0~4 열: 주간 코멘트 */}
      <td className="td_weekly_comment td_br_4" colSpan={5}>
        주간 코멘트
      </td>
      {/* 2. 5~8 열: 행 멤버 추가 버튼 */}
      <td className="td_add_row_member td_br_6" colSpan={4}>
        멤버 추가
      </td>
      {/* 3. 9~13 열: 월요일 */}
      <td className="td_day_comment td_br_4" colSpan={5}>
        {BlankComment(0)}
      </td>
      {/* 4. 14~18 열: 화요일 */}
      <td className="td_day_comment td_br_4" colSpan={5}>
        {BlankComment(1)}
      </td>
      {/* 5. 19~23 열: 수요일 */}
      <td className="td_day_comment td_br_4" colSpan={5}>
        {BlankComment(2)}
      </td>
      {/* 6. 24~28 열: 목요일 */}
      <td className="td_day_comment td_br_4" colSpan={5}>
        {BlankComment(3)}
      </td>
      {/* 7. 29~33 열: 금요일 */}
      <td className="td_day_comment td_br_4" colSpan={5}>
        {BlankComment(4)}
      </td>
      {/* 8. 34~38 열: 토요일 */}
      <td className="td_day_comment td_br_4" colSpan={5}>
        {BlankComment(5)}
      </td>
    </tr>
  )
}
