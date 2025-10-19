import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@component'
import {useRecordCallbacksContext} from '@context'
import {useAppDispatch, useModalActions, useRecordActions, useRecordStates} from '@store'

import type {FC, FormEvent, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import * as V from '@value'

import './_style/ModalCommon.scss'
import './_style/RecordModal.scss'

type RecordModalProps = DivCommonProps & {}

export const RecordModal: FC<RecordModalProps> = ({className, style, ...props}) => {
  const {closeModal} = useModalActions()
  const {weekOIdOpened, rowMemberOpened, dateInfoArr, dayIdxSelected, dailyRecordMap} = useRecordStates()
  const {resetDayIdxSelected, resetRowMemberOpened} = useRecordActions()

  const {writeDailyRecord} = useRecordCallbacksContext()

  const [result0, setResult0] = useState<number>(V.RECORD_WIN)
  const [result1, setResult1] = useState<number>(V.RECORD_WIN)
  const [result2, setResult2] = useState<number>(V.RECORD_WIN)
  const [condError, setCondError] = useState<number>(0)
  const [comment, setComment] = useState<string>('')

  const dispatch = useAppDispatch()

  const dateArr = ['월', '화', '수', '목', '금', '토']

  const _executeModify = useCallback(
    (weekOId: string, rowMemName: string, dateVal: number, result0: number, result1: number, result2: number, condError: number, comment: string) => {
      writeDailyRecord(weekOId, rowMemName, dateVal, result0, result1, result2, condError, comment).then(res => {
        if (res) {
          alert('대전기록 저장 성공')
          dispatch(closeModal())
          dispatch(resetDayIdxSelected())
          dispatch(resetRowMemberOpened())
        }
      })
    },
    [dispatch, writeDailyRecord] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onKeyDownModal = useCallback(
    (weekOId: string, rowMemName: string, dateVal: number, result0: number, result1: number, result2: number, condError: number, comment: string) =>
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          e.stopPropagation()

          _executeModify(weekOId, rowMemName, dateVal, result0, result1, result2, condError, comment)
        } // ::
        else if (e.key === 'Escape') {
          dispatch(closeModal())
          dispatch(resetDayIdxSelected())
          dispatch(resetRowMemberOpened())
        }
      },
    [_executeModify, dispatch, closeModal, resetDayIdxSelected, resetRowMemberOpened]
  )

  const onSubmit = useCallback(
    (weekOId: string, rowMemName: string, dateVal: number, result0: number, result1: number, result2: number, condError: number, comment: string) =>
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        _executeModify(weekOId, rowMemName, dateVal, result0, result1, result2, condError, comment)
      },
    [_executeModify]
  )

  const onClickCancel = useCallback(() => {
    dispatch(closeModal())
    dispatch(resetDayIdxSelected())
    dispatch(resetRowMemberOpened())
  }, [dispatch, closeModal, resetDayIdxSelected, resetRowMemberOpened])

  // 초기화: 기존 값 로드
  useEffect(() => {
    if (rowMemberOpened && dayIdxSelected !== null) {
      const dateVal = dateInfoArr[dayIdxSelected].dateVal
      const rowMemName = rowMemberOpened.rowMemName

      // dailyRecordMap에서 기존 기록 찾기
      const existingRecord = dailyRecordMap[rowMemName]?.[dateVal]

      if (existingRecord) {
        setResult0(existingRecord.result0)
        setResult1(existingRecord.result1)
        setResult2(existingRecord.result2)
        setCondError(existingRecord.condError)
        setComment(existingRecord.comment)
      } // ::
      else {
        // 기록이 없으면 초기값
        setResult0(V.RECORD_WIN)
        setResult1(V.RECORD_WIN)
        setResult2(V.RECORD_WIN)
        setCondError(0)
        setComment('')
      }
    }
  }, [rowMemberOpened, dayIdxSelected, dateInfoArr, dailyRecordMap])

  if (!rowMemberOpened || dayIdxSelected === null) {
    return null
  }

  const dateVal = dateInfoArr[dayIdxSelected].dateVal
  const rowMemName = rowMemberOpened.rowMemName

  return (
    <Modal
      className={`Record_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => {}}
      onKeyDown={onKeyDownModal(weekOIdOpened, rowMemName, dateVal, result0, result1, result2, condError, comment)}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">
        {dateArr[dayIdxSelected]} - {rowMemName}
      </p>

      {/* 2. 대전기록 작성 Form */}
      <form className="_form_modal" onSubmit={onSubmit(weekOIdOpened, rowMemName, dateVal, result0, result1, result2, condError, comment)}>
        {/* 2-1. 1경기 결과 */}
        <div className="_label_block_form">
          <label>1경기</label>
          <div className="_result_buttons">
            {[V.RECORD_WIN, V.RECORD_DRAW, V.RECORD_LOSE, V.RECORD_MISS, V.RECORD_OK].map(resultValue => (
              <button
                key={resultValue}
                type="button"
                className={`_result_button ${result0 === resultValue ? '_selected' : ''}`}
                onClick={() => setResult0(resultValue)}
              >
                {V.getResultString(resultValue) || '승'}
              </button>
            ))}
          </div>
        </div>

        {/* 2-2. 2경기 결과 */}
        <div className="_label_block_form">
          <label>2경기</label>
          <div className="_result_buttons">
            {[V.RECORD_WIN, V.RECORD_DRAW, V.RECORD_LOSE, V.RECORD_MISS, V.RECORD_OK].map(resultValue => (
              <button
                key={resultValue}
                type="button"
                className={`_result_button ${result1 === resultValue ? '_selected' : ''}`}
                onClick={() => setResult1(resultValue)}
              >
                {V.getResultString(resultValue) || '승'}
              </button>
            ))}
          </div>
        </div>

        {/* 2-3. 3경기 결과 */}
        <div className="_label_block_form">
          <label>3경기</label>
          <div className="_result_buttons">
            {[V.RECORD_WIN, V.RECORD_DRAW, V.RECORD_LOSE, V.RECORD_MISS, V.RECORD_OK].map(resultValue => (
              <button
                key={resultValue}
                type="button"
                className={`_result_button ${result2 === resultValue ? '_selected' : ''}`}
                onClick={() => setResult2(resultValue)}
              >
                {V.getResultString(resultValue) || '승'}
              </button>
            ))}
          </div>
        </div>

        {/* 2-4. 컨장유 여부 */}
        <div className="_label_block_form">
          <label>컨장유 여부</label>
          <div className="_condError_buttons">
            <button type="button" className={`_condError_button ${condError === 0 ? '_selected' : ''}`} onClick={() => setCondError(0)}>
              O
            </button>
            <button type="button" className={`_condError_button ${condError === 1 ? '_selected' : ''}`} onClick={() => setCondError(1)}>
              X
            </button>
          </div>
        </div>

        {/* 2-5. 코멘트 */}
        <div className="_label_block_form">
          <label htmlFor="comment">코멘트</label>
          <textarea
            className="_textarea_comment_form"
            id="comment_modal"
            onChange={e => setComment(e.currentTarget.value)}
            placeholder="코멘트를 입력하세요"
            rows={4}
            value={comment}
          />
        </div>

        <div className="_button_row_form">
          {/* 2-6. 저장하기 */}
          <button type="submit" className="_button_form">
            저장하기
          </button>

          {/* 2-7. 취소하기 */}
          <button type="button" className="_button_form" onClick={onClickCancel}>
            취소하기
          </button>
        </div>
      </form>
    </Modal>
  )
}
