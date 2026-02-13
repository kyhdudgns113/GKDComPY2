import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@component'
import {useAppDispatch, useClubStates, useModalActions, useRecordActions, useRecordStates} from '@store'

import type {ChangeEvent, FC, FormEvent, KeyboardEvent} from 'react'
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
  /** teamResultArr[row][0]=위쪽팀(우리), [row][6]=아랫쪽팀(상대). -1=선택안함, 0~4=요일인덱스 */
  const [teamResultArr, setTeamResultArr] = useState<number[][]>([
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1]
  ])

  const dispatch = useAppDispatch()

  const dateArr = ['월', '화', '수', '목', '금', '토']

  /** T/포인트 input onChange: rowIdx행의 colIdx열을 숫자로 갱신 */
  const onChangeTeamResultNum = useCallback(
    (rowIdx: number, colIdx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value) || 0
      setTeamResultArr(prev => prev.map((row, i) => (i === rowIdx ? [...row.slice(0, colIdx), val, ...row.slice(colIdx + 1)] : row)))
    },
    []
  )

  /** 승무승 클릭: rowIdx행의 [3]을 resultVal(-1|0|1)로 설정 */
  const onClickResult = useCallback((rowIdx: number, resultVal: -1 | 0 | 1) => {
    setTeamResultArr(prev => prev.map((row, i) => (i === rowIdx ? [row[0], row[1], row[2], resultVal, row[4], row[5], row[6]] : row)))
  }, [])

  /** 상대 클럽 표시 텍스트: null→(선택안함), 0~4→enemyName 또는 (N요일 상대) */
  const getOpponentDisplayText = useCallback(
    (dayIdx: number | null): string => {
      if (dayIdx === null) return '(선택안함)'
      const info = dateInfoArr[dayIdx]
      const name = info?.enemyName?.trim()
      return name ? name : `(${dateArr[dayIdx]}요일 상대)`
    },
    [dateInfoArr, dateArr]
  )

  const _executeModify = useCallback(
    (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string, teamResultArr: number[][]) => {
      modifyDailyInfo(weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments, teamResultArr) // ::
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
    (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string, teamResultArr: number[][]) =>
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          e.stopPropagation()

          _executeModify(weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments, teamResultArr)
        } // ::
        else if (e.key === 'Escape') {
          dispatch(closeModal())
        }
      },
    [_executeModify, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onSubmit = useCallback(
    (weekOId: string, dateVal: number, enemyName: string, pitchOrder: number, dailyOrder: string, comments: string, teamResultArr: number[][]) =>
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        _executeModify(weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments, teamResultArr)
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
      if (dateInfoArr[dayIdxSelected].teamResultArr) {
        setTeamResultArr(dateInfoArr[dayIdxSelected].teamResultArr)
      } // ::
      else {
        setTeamResultArr([
          [-1, 0, 0, 0, 0, 0, -1],
          [-1, 0, 0, 0, 0, 0, -1],
          [-1, 0, 0, 0, 0, 0, -1]
        ])
      }
    }
  }, [dayIdxSelected, dateInfoArr])

  return (
    <Modal
      className={`DayInfoModify_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => {}}
      onKeyDown={onKeyDownModal(weekOIdOpened, dateVal, enemyName, pitchOrder, dailyOrder, comments, teamResultArr)}
      style={style}
      {...props} // ::
    >
      {/* 2. 일간 정보 수정 Form */}
      <form className="_form_modal" onSubmit={onSubmit(weekOIdOpened, dateVal, enemyName, pitchOrder, dailyOrder, comments, teamResultArr)}>
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
              <input
                className="_tropy_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[0]?.[1] ?? 0}
                onChange={onChangeTeamResultNum(0, 1)}
              />
              <input
                className="_points_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[0]?.[2] ?? 0}
                onChange={onChangeTeamResultNum(0, 2)}
              />
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(0, -1)}>
                {(teamResultArr[0]?.[3] ?? 0) === -1 ? 'V' : ''}
              </button>
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(0, 0)}>
                {(teamResultArr[0]?.[3] ?? 0) === 0 ? 'V' : ''}
              </button>
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(0, 1)}>
                {(teamResultArr[0]?.[3] ?? 0) === 1 ? 'V' : ''}
              </button>
              <input
                className="_points_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[0]?.[4] ?? 0}
                onChange={onChangeTeamResultNum(0, 4)}
              />
              <input
                className="_tropy_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[0]?.[5] ?? 0}
                onChange={onChangeTeamResultNum(0, 5)}
              />
              <span className="_teamName_teamResult">{`${enemyName}` || `${dateArr[dayIdxSelected || 0]}요일 상대`}</span>
            </div>

            {/* 2-5-3. 대전결과 행_1 번째 */}
            <div className="_row_record_teamResult idx1">
              <span className="_teamName_teamResult _bdr _select_wrap">
                <select
                  className="_select_opponent_teamResult"
                  value={teamResultArr[1][0] ?? ''}
                  onChange={e => {
                    const v = e.currentTarget.value
                    setTeamResultArr(prev =>
                      prev.map((row, i) => (i === 1 ? [v === '' ? -1 : Number(v), row[1], row[2], row[3], row[4], row[5], row[6]] : row))
                    )
                  }}
                >
                  <option value="">(선택안함)</option>
                  {[0, 1, 2, 3, 4].map(d => (
                    <option key={d} value={d}>
                      {getOpponentDisplayText(d)}
                    </option>
                  ))}
                </select>
              </span>
              <input
                className="_tropy_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[1]?.[1] ?? 0}
                onChange={onChangeTeamResultNum(1, 1)}
              />
              <input
                className="_points_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[1]?.[2] ?? 0}
                onChange={onChangeTeamResultNum(1, 2)}
              />
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(1, -1)}>
                {(teamResultArr[1]?.[3] ?? 0) === -1 ? 'V' : ''}
              </button>
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(1, 0)}>
                {(teamResultArr[1]?.[3] ?? 0) === 0 ? 'V' : ''}
              </button>
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(1, 1)}>
                {(teamResultArr[1]?.[3] ?? 0) === 1 ? 'V' : ''}
              </button>
              <input
                className="_points_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[1]?.[4] ?? 0}
                onChange={onChangeTeamResultNum(1, 4)}
              />
              <input
                className="_tropy_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[1]?.[5] ?? 0}
                onChange={onChangeTeamResultNum(1, 5)}
              />
              <span className="_teamName_teamResult _select_wrap">
                <select
                  className="_select_opponent_teamResult"
                  value={teamResultArr[1][6] ?? ''}
                  onChange={e => {
                    const v = e.currentTarget.value
                    setTeamResultArr(prev =>
                      prev.map((row, i) => (i === 1 ? [row[0], row[1], row[2], row[3], row[4], row[5], v === '' ? -1 : Number(v)] : row))
                    )
                  }}
                >
                  <option value="">(선택안함)</option>
                  {[0, 1, 2, 3, 4].map(d => (
                    <option key={d} value={d}>
                      {getOpponentDisplayText(d)}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            {/* 2-5-4. 대전결과 행_2 번째 */}
            <div className="_row_record_teamResult idx2">
              <span className="_teamName_teamResult _bdr _select_wrap">
                <select
                  className="_select_opponent_teamResult"
                  value={teamResultArr[2][0] ?? ''}
                  onChange={e => {
                    const v = e.currentTarget.value
                    setTeamResultArr(prev =>
                      prev.map((row, i) => (i === 2 ? [v === '' ? -1 : Number(v), row[1], row[2], row[3], row[4], row[5], row[6]] : row))
                    )
                  }}
                >
                  <option value="">(선택안함)</option>
                  {[0, 1, 2, 3, 4].map(d => (
                    <option key={d} value={d}>
                      {getOpponentDisplayText(d)}
                    </option>
                  ))}
                </select>
              </span>
              <input
                className="_tropy_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[2]?.[1] ?? 0}
                onChange={onChangeTeamResultNum(2, 1)}
              />
              <input
                className="_points_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[2]?.[2] ?? 0}
                onChange={onChangeTeamResultNum(2, 2)}
              />
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(2, -1)}>
                {(teamResultArr[2]?.[3] ?? 0) === -1 ? 'V' : ''}
              </button>
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(2, 0)}>
                {(teamResultArr[2]?.[3] ?? 0) === 0 ? 'V' : ''}
              </button>
              <button type="button" className="_result_teamResult _bdr _click_result" onClick={() => onClickResult(2, 1)}>
                {(teamResultArr[2]?.[3] ?? 0) === 1 ? 'V' : ''}
              </button>
              <input
                className="_points_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[2]?.[4] ?? 0}
                onChange={onChangeTeamResultNum(2, 4)}
              />
              <input
                className="_tropy_teamResult _bdr"
                type="number"
                min={0}
                value={teamResultArr[2]?.[5] ?? 0}
                onChange={onChangeTeamResultNum(2, 5)}
              />
              <span className="_teamName_teamResult _select_wrap">
                <select
                  className="_select_opponent_teamResult"
                  value={teamResultArr[2][6] ?? ''}
                  onChange={e => {
                    const v = e.currentTarget.value
                    setTeamResultArr(prev =>
                      prev.map((row, i) => (i === 2 ? [row[0], row[1], row[2], row[3], row[4], row[5], v === '' ? -1 : Number(v)] : row))
                    )
                  }}
                >
                  <option value="">(선택안함)</option>
                  {[0, 1, 2, 3, 4].map(d => (
                    <option key={d} value={d}>
                      {getOpponentDisplayText(d)}
                    </option>
                  ))}
                </select>
              </span>
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
