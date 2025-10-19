import {useCallback, useEffect, useState} from 'react'
import {useAppDispatch, useModalActions, useRecordActions, useRecordStates} from '@store'

import {GoldCrown, SilverCrown} from '../components'

import type {FC, MouseEvent} from 'react'
import type {TableRowCommonProps} from '@prop'
import type {RowMemberType, WeekRowType} from '@shareType'

import * as SV from '@shareValue'
import * as T from '@type'
import * as U from '@util'
import * as V from '@value'

import '../_styles/Grp_MemberRow.scss'

type MemberRowGroupProps = TableRowCommonProps & {
  rowMember: RowMemberType
  weekRow: WeekRowType
}

export const MemberRowGroup: FC<MemberRowGroupProps> = ({rowMember, weekRow, className, style, ...props}) => {
  const {dailyRecordMap} = useRecordStates()
  const {incStaticDraw, incStaticLose, incStaticMiss, incStaticCond, setRowMemberOpened, setDayIdxSelected} = useRecordActions()
  const {openModalModifyRowMembeInfo, openModalRecord} = useModalActions()

  const [condArr, setCondArr] = useState<string[]>(Array(6).fill(''))
  const [resultsArr, setResultsArr] = useState<string[][]>(Array(6).fill(Array(3).fill('')))
  const [mentsArr, setMentsArr] = useState<string[]>(Array(6).fill(''))
  const [weekResult, setWeekResult] = useState<T.RecordStatisticType>({sumDraw: 0, sumLose: 0, sumMiss: 0, sumCond: 0})

  const dispatch = useAppDispatch()

  const {rowMemName, batterPower, pitcherPower, position} = rowMember
  const rowMemTotal = batterPower + pitcherPower

  const onClickMemberInfo = useCallback(
    (rowMember: RowMemberType) => (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(setRowMemberOpened(rowMember))
      dispatch(openModalModifyRowMembeInfo())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickRecord = useCallback(
    (rowMember: RowMemberType, dayIdx: number) => (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(setRowMemberOpened(rowMember))
      dispatch(setDayIdxSelected(dayIdx))
      dispatch(openModalRecord())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // 초기화: 각종 배열들
  useEffect(() => {
    const {rowMemName} = rowMember

    const newCondArr = Array.from({length: 6}, () => '')
    const newResultsArr = Array.from({length: 6}, () => Array.from({length: 3}, () => ''))
    const newMentsArr = Array.from({length: 6}, () => '')
    const newWeekResult: T.RecordStatisticType = {sumDraw: 0, sumLose: 0, sumMiss: 0, sumCond: 0}

    const {startDateVal} = weekRow
    const recordArr = dailyRecordMap[rowMemName]

    // 그 다음 멤버의 주간 기록이 있어야 한다.
    if (recordArr) {
      for (let i = 0; i < 6; i++) {
        const dateVal = U.shiftDateValue(startDateVal, i)
        const dailyRecord = recordArr[dateVal]

        // 마지막으로 해당 일자의 기록이 있어야 데이터를 넣던가 한다.
        if (dailyRecord) {
          // 1. condError 가 있으면 '컨' 을 저장한다.
          if (dailyRecord.condError > 0) {
            dispatch(incStaticCond(i))
            newCondArr[i] = 'X'
            newWeekResult.sumCond += 1
          }

          // 2. result0~resul2 값에 따라서 다른 값들을 저장한다.
          newResultsArr[i][0] = V.getResultString(dailyRecord.result0)
          newResultsArr[i][1] = V.getResultString(dailyRecord.result1)
          newResultsArr[i][2] = V.getResultString(dailyRecord.result2)
          for (let j = 0; j < 3; j++) {
            switch (newResultsArr[i][j]) {
              case '무':
                dispatch(incStaticDraw(i))
                newWeekResult.sumDraw += 1
                break
              case '패':
                dispatch(incStaticLose(i))
                newWeekResult.sumLose += 1
                break
              case '미':
                dispatch(incStaticMiss(i))
                newWeekResult.sumMiss += 1
                break
              default:
                break
            }
          }

          // 3. comment 가 있으면 'V' 을 저장한다.
          newMentsArr[i] = dailyRecord.comment ? 'V' : ''
        }
      }
    }

    setCondArr(newCondArr)
    setResultsArr(newResultsArr)
    setMentsArr(newMentsArr)
    setWeekResult(newWeekResult)
    // ::
  }, [dailyRecordMap, rowMember, weekRow, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <tr className={`MemberRow_Group ${rowMember.rowMemName || '<<ERROR>>'} ${className || ''}`} style={style} {...props}>
      {/* 0~4 열: 주간 통계 */}
      <td className="td_week_condError _total td_br_2">{weekResult.sumCond > 0 ? weekResult.sumCond : ''}</td>
      <td className="td_week_draw _total td_br_2">{weekResult.sumDraw > 0 ? weekResult.sumDraw : ''}</td>
      <td className="td_week_lose _total td_br_2">{weekResult.sumLose > 0 ? weekResult.sumLose : ''}</td>
      <td className="td_week_miss _total td_br_4">{weekResult.sumMiss > 0 ? weekResult.sumMiss : ''}</td>
      {/* 5~8 열: 멤버 정보 */}
      <td className="td_member_star td_br_2" onClick={onClickMemberInfo(rowMember)}>
        {position === SV.MEMBER_POSITION_GOLD ? <GoldCrown /> : position === SV.MEMBER_POSITION_SILVER ? <SilverCrown /> : <></>}
      </td>
      <td className="td_member_name td_br_2" onClick={onClickMemberInfo(rowMember)}>
        {rowMemName}
      </td>
      <td className="td_member_pitcher td_br_2" onClick={onClickMemberInfo(rowMember)}>
        {pitcherPower.toLocaleString()}
      </td>
      <td className="td_member_total td_br_6" onClick={onClickMemberInfo(rowMember)}>
        {rowMemTotal.toLocaleString()}
      </td>
      {/* 9~13 열: 월요알 */}
      <td className="td_day_condError td_br_2" onClick={onClickRecord(rowMember, 0)}>
        {condArr[0]}
      </td>
      <td className="td_day_draw td_br_2" onClick={onClickRecord(rowMember, 0)}>
        {resultsArr[0][0]}
      </td>
      <td className="td_day_lose td_br_2" onClick={onClickRecord(rowMember, 0)}>
        {resultsArr[0][1]}
      </td>
      <td className="td_day_miss td_br_2" onClick={onClickRecord(rowMember, 0)}>
        {resultsArr[0][2]}
      </td>
      <td className="td_day_ments td_br_4" onClick={onClickRecord(rowMember, 0)}>
        {mentsArr[0]}
      </td>
      {/* 14~18 열: 화요알 */}
      <td className="td_day_condError td_br_2" onClick={onClickRecord(rowMember, 1)}>
        {condArr[1]}
      </td>
      <td className="td_day_draw td_br_2" onClick={onClickRecord(rowMember, 1)}>
        {resultsArr[1][0]}
      </td>
      <td className="td_day_lose td_br_2" onClick={onClickRecord(rowMember, 1)}>
        {resultsArr[1][1]}
      </td>
      <td className="td_day_miss td_br_2" onClick={onClickRecord(rowMember, 1)}>
        {resultsArr[1][2]}
      </td>
      <td className="td_day_ments td_br_4" onClick={onClickRecord(rowMember, 1)}>
        {mentsArr[1]}
      </td>
      {/* 19~23 열: 수요알 */}
      <td className="td_day_condError td_br_2" onClick={onClickRecord(rowMember, 2)}>
        {condArr[2]}
      </td>
      <td className="td_day_draw td_br_2" onClick={onClickRecord(rowMember, 2)}>
        {resultsArr[2][0]}
      </td>
      <td className="td_day_lose td_br_2" onClick={onClickRecord(rowMember, 2)}>
        {resultsArr[2][1]}
      </td>
      <td className="td_day_miss td_br_2" onClick={onClickRecord(rowMember, 2)}>
        {resultsArr[2][2]}
      </td>
      <td className="td_day_ments td_br_4" onClick={onClickRecord(rowMember, 2)}>
        {mentsArr[2]}
      </td>
      {/* 24~28 열: 목요알 */}
      <td className="td_day_condError td_br_2" onClick={onClickRecord(rowMember, 3)}>
        {condArr[3]}
      </td>
      <td className="td_day_draw td_br_2" onClick={onClickRecord(rowMember, 3)}>
        {resultsArr[3][0]}
      </td>
      <td className="td_day_lose td_br_2" onClick={onClickRecord(rowMember, 3)}>
        {resultsArr[3][1]}
      </td>
      <td className="td_day_miss td_br_2" onClick={onClickRecord(rowMember, 3)}>
        {resultsArr[3][2]}
      </td>
      <td className="td_day_ments td_br_4" onClick={onClickRecord(rowMember, 3)}>
        {mentsArr[3]}
      </td>
      {/* 29~33 열: 금요알 */}
      <td className="td_day_condError td_br_2" onClick={onClickRecord(rowMember, 4)}>
        {condArr[4]}
      </td>
      <td className="td_day_draw td_br_2" onClick={onClickRecord(rowMember, 4)}>
        {resultsArr[4][0]}
      </td>
      <td className="td_day_lose td_br_2" onClick={onClickRecord(rowMember, 4)}>
        {resultsArr[4][1]}
      </td>
      <td className="td_day_miss td_br_2" onClick={onClickRecord(rowMember, 4)}>
        {resultsArr[4][2]}
      </td>
      <td className="td_day_ments td_br_4" onClick={onClickRecord(rowMember, 4)}>
        {mentsArr[4]}
      </td>
      {/* 34~38 열: 토요알 */}
      <td className="td_day_condError td_br_2" onClick={onClickRecord(rowMember, 5)}>
        {condArr[5]}
      </td>
      <td className="td_day_draw td_br_2" onClick={onClickRecord(rowMember, 5)}>
        {resultsArr[5][0]}
      </td>
      <td className="td_day_lose td_br_2" onClick={onClickRecord(rowMember, 5)}>
        {resultsArr[5][1]}
      </td>
      <td className="td_day_miss td_br_2" onClick={onClickRecord(rowMember, 5)}>
        {resultsArr[5][2]}
      </td>
      <td className="td_day_ments td_br_4" onClick={onClickRecord(rowMember, 5)}>
        {mentsArr[5]}
      </td>
    </tr>
  )
}
