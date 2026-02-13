import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@component'
import {useAppDispatch, useClubStates, useModalActions, useRecordActions, useRecordStates} from '@store'

import type {FC, FormEvent, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/DayInfoModifyModal.scss'
import {useRecordCallbacksContext} from '@context'

type DayInfoModifyModalProps = DivCommonProps & {}

/* eslint-disable */
export const DayInfoModifyModal: FC<DayInfoModifyModalProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {closeModal} = useModalActions()
  const {dateInfoArr, dayIdxSelected, weekOIdOpened} = useRecordStates()
  const {resetDayIdxSelected} = useRecordActions()

  const {modifyDailyInfo} = useRecordCallbacksContext()

  const [enemyName, setEnemyName] = useState<string>('')
  const [pitchOrder, setPitchOrder] = useState<number>(0)
  const [dailyOrder, setDailyOrder] = useState<string>('')
  const [dateVal, setDateVal] = useState<number>(0)
  const [comments, setComments] = useState<string>('')
  const [teamResultArr, setTeamResultArr] = useState<(number | null)[][]>([
    [null, 0, 0, 0, 0, 0, null],
    [null, 0, 0, 0, 0, 0, null],
    [null, 0, 0, 0, 0, 0, null]
  ])

  const dispatch = useAppDispatch()

  const dateArr = ['월', '화', '수', '목', '금', '토']

  const _executeModify = useCallback(
    (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string) => {
      modifyDailyInfo(weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments) // ::
        .then(res => {
          if (res) {
            dispatch(closeModal())
            dispatch(resetDayIdxSelected())
          }
        })
    },
    [dispatch, modifyDailyInfo] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onKeyDownModal = useCallback(
    (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string) =>
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          e.stopPropagation()

          _executeModify(weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments)
        } // ::
        else if (e.key === 'Escape') {
          dispatch(closeModal())
        }
      },
    [_executeModify, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onSubmit = useCallback(
    (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string) =>
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        _executeModify(weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments)
      },
    [_executeModify]
  )

  useEffect(() => {
    if (dayIdxSelected !== null) {
      setEnemyName(dateInfoArr[dayIdxSelected].enemyName)
      setPitchOrder(dateInfoArr[dayIdxSelected].pitchOrder)
      setDailyOrder(dateInfoArr[dayIdxSelected].dailyOrder)
      setDateVal(dateInfoArr[dayIdxSelected].dateVal)
      setComments(dateInfoArr[dayIdxSelected].comments)
      setTeamResultArr(dateInfoArr[dayIdxSelected].teamResultArr)
    }
  }, [dayIdxSelected, dateInfoArr])

  return (
    <Modal
      className={`DayInfoModify_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => {}}
      onKeyDown={onKeyDownModal(weekOIdOpened, dateVal, enemyName, pitchOrder, dailyOrder, comments)}
      style={style}
      {...props} // ::
    >
      {/* 2. 일간 정보 수정 Form */}
      <form className="_form_modal" onSubmit={onSubmit(weekOIdOpened, dateVal, enemyName, pitchOrder, dailyOrder, comments)}>
        {/* 2-1. 상대 클럽명 */}
        <div className="_label_block_form">
          <label htmlFor="enemyName">상대 클럽명</label>
          <input
            autoFocus
            className="_input_enemyName_form"
            id="enemyName_modal"
            onChange={e => setEnemyName(e.currentTarget.value)}
            placeholder="상대 클럽명을 입력하세요"
            type="text"
            value={enemyName}
          />
        </div>

        {/* 2-2. 선발 순서 */}
        <div className="_label_block_form">
          <label>선발 순서</label>
          <div className="_pitch_order_buttons">
            {[123, 234, 345, 451, 512].map(order => (
              <button
                key={order}
                type="button"
                className={`_pitch_order_button ${pitchOrder === order ? '_selected' : ''}`}
                onClick={() => setPitchOrder(order)}
              >
                {order}
              </button>
            ))}
          </div>
        </div>

        {/* 2-3. 클전 오더 */}
        <div className="_label_block_form">
          <label htmlFor="dailyOrder">클전 오더</label>
          <input
            className="_input_dailyOrder_form"
            id="dailyOrder_modal"
            onChange={e => setDailyOrder(e.currentTarget.value)}
            placeholder="클전 오더를 입력하세요"
            type="text"
            value={dailyOrder}
          />
        </div>

        {/* 2-4. 일간 코멘트 */}
        <div className="_label_block_form">
          <label htmlFor="comments">일간 코멘트</label>
          <textarea
            className="_textarea_comments_form"
            id="comments_modal"
            onChange={e => setComments(e.currentTarget.value)}
            placeholder="일간 코멘트를 입력하세요"
            rows={4}
            value={comments}
          />
        </div>

        {/* 2-5. 팀별 대진 결과 */}
        <div className="_label_block_form">
          <div className="_block_teamResult">
            {/* 2-5-1. 대전 결과 헤더 */}
            <div className="_row_header_teamResult">
              <span className="_teamName_teamResult _bdr">팀명</span>
              <span className="_tropy_teamResult _bdr">T</span>
              <span className="_points_teamResult _bdr">포인트</span>
              <span className="_result_teamResult _bdr">승</span>
              <span className="_result_teamResult _bdr">무</span>
              <span className="_result_teamResult _bdr">승</span>
              <span className="_points_teamResult _bdr">포인트</span>
              <span className="_tropy_teamResult _bdr">T</span>
              <span className="_teamName_teamResult">팀명</span>
            </div>

            {/* 2-5-2. 대전결과 행_0 번째 */}
            <div className="_row_record_teamResult idx0">
              <span className="_teamName_teamResult _bdr">{clubOpened.clubName}</span>
              <span className="_tropy_teamResult _bdr">T</span>
              <span className="_points_teamResult _bdr">포인트</span>
              <span className="_result_teamResult _bdr">승</span>
              <span className="_result_teamResult _bdr">무</span>
              <span className="_result_teamResult _bdr">승</span>
              <span className="_points_teamResult _bdr">포인트</span>
              <span className="_tropy_teamResult _bdr">T</span>
              <span className="_teamName_teamResult">{`${enemyName}` || `${dateArr[dayIdxSelected || 0]}요일 상대`}</span>
            </div>

            {/* 2-5-3. 대전결과 행_1 번째 */}
            <div className="_row_record_teamResult idx0">
              <span className="_teamName_teamResult _bdr">{clubOpened.clubName}</span>
              <span className="_tropy_teamResult _bdr">T</span>
              <span className="_points_teamResult _bdr">포인트</span>
              <span className="_result_teamResult _bdr">승</span>
              <span className="_result_teamResult _bdr">무</span>
              <span className="_result_teamResult _bdr">승</span>
              <span className="_points_teamResult _bdr">포인트</span>
              <span className="_tropy_teamResult _bdr">T</span>
              <span className="_teamName_teamResult">{`${enemyName}` || `${dateArr[dayIdxSelected || 0]}요일 상대`}</span>
            </div>
          </div>
        </div>

        <div className="_button_row_form">
          {/* 2-6. 수정하기 */}
          <button type="submit" className="_button_form">
            수정하기
          </button>

          {/* 2-7. 취소하기 */}
          <button type="button" className="_button_form" onClick={() => dispatch(closeModal())}>
            취소하기
          </button>
        </div>
      </form>
    </Modal>
  )
}
