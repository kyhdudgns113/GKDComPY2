import {useEffect} from 'react'

import {useRecordStates} from '@store'
import {useRecordCallbacksContext} from '@context'

import {DeleteWeekButton} from '../buttons'
import {RecordTablePart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/SP_Record.scss'

type RecordSubPageProps = DivCommonProps & {}

export const RecordSubPage: FC<RecordSubPageProps> = ({className, style, ...props}) => {
  const {weekOIdOpened, weekRowArr} = useRecordStates()

  const {loadWeeklyRecordInfo} = useRecordCallbacksContext()

  const weekRow = weekRowArr.find(weekRow => weekRow.weekOId === weekOIdOpened)

  // 초기화: 주간 기록 데이터 불러오기
  useEffect(() => {
    if (!weekOIdOpened || !weekRow) {
      return
    }
    loadWeeklyRecordInfo(weekOIdOpened)
  }, [weekOIdOpened, weekRow, loadWeeklyRecordInfo])

  if (!weekOIdOpened || !weekRow) {
    return (
      <div className={`Record_SubPage ${className || ''}`} style={style} {...props}>
        <p>&nbsp;</p>
      </div>
    )
  }

  return (
    <div className={`Record_SubPage ${className || ''}`} style={style} {...props}>
      <div className="_row_0_title_subpage">
        {/* 1. 타이틀 */}
        <p className="_title_subpage">{`${weekRow.startDateVal}~${weekRow.endDateVal}`}</p>

        {/* 2. 주차 삭제 버튼 */}
        <DeleteWeekButton />
      </div>

      {/* 3. 기록 테이블 */}
      <RecordTablePart weekRow={weekRow} />
    </div>
  )
}
