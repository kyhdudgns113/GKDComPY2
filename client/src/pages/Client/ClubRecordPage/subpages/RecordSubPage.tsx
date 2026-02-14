import {useEffect} from 'react'

import {useAppDispatch, useRecordActions, useRecordStates} from '@store'
import {useRecordCallbacksContext} from '@context'

import {DeleteWeekButton, ShowRecordButton, ShowStatisticButton} from '../buttons'
import {RecordTablePart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/SP_Record.scss'

type RecordSubPageProps = DivCommonProps & {}

export const RecordSubPage: FC<RecordSubPageProps> = ({className, style, ...props}) => {
  const {weekOIdOpened, weekRowArr} = useRecordStates()

  const {loadWeeklyRecordInfo} = useRecordCallbacksContext()
  const {resetStatisticArr} = useRecordActions()

  const dispatch = useAppDispatch()

  const weekRow = weekRowArr.find(weekRow => weekRow.weekOId === weekOIdOpened)

  // 초기화: 주간 기록 데이터 불러오기
  useEffect(() => {
    if (!weekOIdOpened || !weekRow) {
      return
    }
    loadWeeklyRecordInfo(weekOIdOpened)

    return () => {
      dispatch(resetStatisticArr())
    }
  }, [weekOIdOpened, weekRow, dispatch, loadWeeklyRecordInfo]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!weekOIdOpened || !weekRow) {
    return (
      <div className={`Record_SubPage _NULL ${className || ''}`} style={style} {...props}>
        <p>&nbsp;</p>
      </div>
    )
  }

  return (
    <div className={`Record_SubPage ${className || ''}`} style={style} {...props}>
      {/* 1. 최상단 행 1 (좌측 고정): 타이틀, 삭제버튼 */}
      <div className="_row_1_title_subpage">
        {/* 1-1. 타이틀 */}
        <p className="_title_subpage">{`${weekRow.startDateVal}~${weekRow.endDateVal}`}</p>

        {/* 1-2. 주차 삭제 버튼 */}
        <DeleteWeekButton />
      </div>

      {/* 2. 최상단 행 2 (중앙 고정): 표시 모드 버튼 */}
      <div className="_row_2_mode_buttons_subpage">
        <ShowRecordButton />
        <ShowStatisticButton />
      </div>

      {/* 3. 기록 테이블 */}
      <div className="_row_3_tables_subpage">
        <RecordTablePart weekRow={weekRow} />
      </div>
    </div>
  )
}
