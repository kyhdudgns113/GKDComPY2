import {useCallback} from 'react'

import {Modal} from '@component'
import {useMemberCallbacksContext} from '@context'
import {useAppDispatch, useMemberStates, useModalActions} from '@store'

import type {FC, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/MemberDelModal.scss'

type MemberDelModalProps = DivCommonProps & {}

export const MemberDelModal: FC<MemberDelModalProps> = ({className, style, ...props}) => {
  const {closeModal} = useModalActions()
  const {clubMemberOpened} = useMemberStates()
  const {removeClubMember} = useMemberCallbacksContext()

  const dispatch = useAppDispatch()

  const _executeDelete = useCallback(
    (clubOId: string, memOId: string) => {
      removeClubMember(clubOId, memOId).then(res => {
        if (res) {
          alert('멤버 삭제 성공')
          dispatch(closeModal())
        }
      })
    },
    [removeClubMember, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onKeyDownModal = useCallback(
    (clubOId: string, memOId: string) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        _executeDelete(clubOId, memOId)
      } // ::
      else if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    },
    [_executeDelete, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickDelete = useCallback(() => {
    _executeDelete(clubMemberOpened.clubOId, clubMemberOpened.memOId)
  }, [_executeDelete, clubMemberOpened]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      className={`MemberDel_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => dispatch(closeModal())}
      onKeyDown={onKeyDownModal(clubMemberOpened.clubOId, clubMemberOpened.memOId)}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">멤버 삭제 확인</p>

      {/* 2. 확인 메시지 */}
      <div className="_content_modal">
        <p className="_confirm_text">
          <strong>{clubMemberOpened.memName}</strong> 멤버를 삭제하시겠습니까?
        </p>
        <p className="_warning_text">이 작업은 되돌릴 수 없습니다.</p>
      </div>

      {/* 3. 버튼 */}
      <div className="_button_row_form">
        <button type="button" className="_button_form _button_delete" onClick={onClickDelete}>
          삭제하기
        </button>

        <button type="button" className="_button_form _button_cancel" onClick={() => dispatch(closeModal())} autoFocus>
          취소하기
        </button>
      </div>
    </Modal>
  )
}
