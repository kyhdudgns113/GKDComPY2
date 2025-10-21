import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@component'
import {useAppDispatch, useModalActions, useRecordStates} from '@store'

import type {FC, FormEvent, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/WeekInfoModifyModal.scss'
import {useRecordCallbacksContext} from '@context'

type WeekInfoModifyModalProps = DivCommonProps & {}

export const WeekInfoModifyModal: FC<WeekInfoModifyModalProps> = ({className, style, ...props}) => {
  const {closeModal} = useModalActions()
  const {weekRowArr, weekOIdOpened} = useRecordStates()

  const {modifyWeeklyInfo} = useRecordCallbacksContext()

  const [weekComments, setWeekComments] = useState<string>('')

  const dispatch = useAppDispatch()

  const _executeModify = useCallback(
    (weekOId: string, weekComments: string) => {
      modifyWeeklyInfo(weekOId, weekComments) // ::
        .then(res => {
          if (res) {
            dispatch(closeModal())
          }
        })
    },
    [dispatch, modifyWeeklyInfo] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onKeyDownModal = useCallback(
    (weekOId: string, weekComments: string) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        e.stopPropagation()

        _executeModify(weekOId, weekComments)
      } // ::
      else if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    },
    [_executeModify, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onSubmit = useCallback(
    (weekOId: string, weekComments: string) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeModify(weekOId, weekComments)
    },
    [_executeModify]
  )

  // 초기화: 주간 코멘트
  useEffect(() => {
    const weekRow = weekRowArr.find(row => row.weekOId === weekOIdOpened)
    if (weekRow) {
      setWeekComments(weekRow.weekComments)
    }
  }, [weekOIdOpened, weekRowArr])

  return (
    <Modal
      className={`WeekInfoModify_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => {}}
      onKeyDown={onKeyDownModal(weekOIdOpened, weekComments)}
      style={style}
      {...props} // ::
    >
      {/* 2. 주간 정보 수정 Form */}
      <form className="_form_modal" onSubmit={onSubmit(weekOIdOpened, weekComments)}>
        {/* 2-1. 주간 코멘트 */}
        <div className="_label_block_form">
          <label htmlFor="weekComments">주간 코멘트</label>
          <textarea
            autoFocus
            className="_textarea_comments_form"
            id="weekComments_modal"
            onChange={e => setWeekComments(e.currentTarget.value)}
            placeholder="주간 코멘트를 입력하세요"
            rows={6}
            value={weekComments}
          />
        </div>

        <div className="_button_row_form">
          {/* 2-2. 수정하기 */}
          <button type="submit" className="_button_form">
            수정하기
          </button>

          {/* 2-3. 취소하기 */}
          <button type="button" className="_button_form" onClick={() => dispatch(closeModal())}>
            취소하기
          </button>
        </div>
      </form>
    </Modal>
  )
}
