import {useCallback} from 'react'

import {useAppDispatch, useModalActions, useRecordActions, useRecordStates} from '@store'

import {AddRowMemberButton} from '../buttons'

import type {FC, MouseEvent} from 'react'
import type {TableRowCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_CommentRow.scss'

type CommentRowGroupProps = TableRowCommonProps & {
  weekRow: WeekRowType
}

export const CommentRowGroup: FC<CommentRowGroupProps> = ({weekRow, className, style, ...props}) => {
  const {dateInfoArr} = useRecordStates()
  const {setDayIdxSelected} = useRecordActions()
  const {openModalModifyDailyInfo, openModalModifyWeeklyInfo} = useModalActions()
  const dispatch = useAppDispatch()

  const {weekOId} = weekRow

  const onClickDaily = useCallback(
    (dayIdx: number) => (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(setDayIdxSelected(dayIdx))
      dispatch(openModalModifyDailyInfo())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickWeekComments = useCallback(
    (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(openModalModifyWeeklyInfo())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const BlankComment = useCallback((dayIdx: number) => {
    const dayNameArr = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '주   간']
    const dayName = dayNameArr[dayIdx]

    return <div className="_blank_comment">{`${dayName}\n코멘트`}</div>
  }, [])

  return (
    <tr className={`CommentRow_Group ${weekOId} ${className || ''}`} style={style} {...props}>
      {/* 1. 0~4 열: 주간 코멘트 */}
      <td className="td_weekly_comment td_br_4" colSpan={4} onClick={onClickWeekComments}>
        {weekRow.weekComments.trim() || BlankComment(6)}
      </td>
      {/* 2. 5~8 열: 행 멤버 추가 버튼 */}
      <td className="td_add_row_member td_br_6" colSpan={4}>
        <AddRowMemberButton />
      </td>
      {/* 3. 9~13 열: 월요일 */}
      <td className="td_day_comment td_br_4" colSpan={5} onClick={onClickDaily(0)}>
        {dateInfoArr[0]?.comments.trim() || BlankComment(0)}
      </td>
      {/* 4. 14~18 열: 화요일 */}
      <td className="td_day_comment td_br_4" colSpan={5} onClick={onClickDaily(1)}>
        {dateInfoArr[1]?.comments.trim() || BlankComment(1)}
      </td>
      {/* 5. 19~23 열: 수요일 */}
      <td className="td_day_comment td_br_4" colSpan={5} onClick={onClickDaily(2)}>
        {dateInfoArr[2]?.comments.trim() || BlankComment(2)}
      </td>
      {/* 6. 24~28 열: 목요일 */}
      <td className="td_day_comment td_br_4" colSpan={5} onClick={onClickDaily(3)}>
        {dateInfoArr[3]?.comments.trim() || BlankComment(3)}
      </td>
      {/* 7. 29~33 열: 금요일 */}
      <td className="td_day_comment td_br_4" colSpan={5} onClick={onClickDaily(4)}>
        {dateInfoArr[4]?.comments.trim() || BlankComment(4)}
      </td>
      {/* 8. 34~38 열: 토요일 */}
      <td className="td_day_comment td_br_4" colSpan={5} onClick={onClickDaily(5)}>
        {dateInfoArr[5]?.comments.trim() || BlankComment(5)}
      </td>
    </tr>
  )
}
