import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useAuthStatesContext, useCommunityCallbacksContext} from '@context'
import {useAppDispatch, useModalActions} from '@store'

import type {FC, FormEvent, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/ClubAddModal.scss'

type ClubAddModalProps = DivCommonProps & {}

export const ClubAddModal: FC<ClubAddModalProps> = ({className, style, ...props}) => {
  const {closeModal} = useModalActions()
  const {commOId} = useAuthStatesContext() // eslint-disable-line

  const [clubName, setClubName] = useState<string>('')

  const dispatch = useAppDispatch()

  const {addCommunityClub} = useCommunityCallbacksContext()

  const _executeAdd = useCallback(
    (commOId: string, clubName: string) => {
      if (!clubName) {
        alert('모든 필드를 입력해주세요.')
        return
      }

      addCommunityClub(commOId, clubName) // ::
        .then(res => {
          if (res) {
            alert('클럽 추가 성공')
            dispatch(closeModal())
          }
        })
    },
    [addCommunityClub, closeModal, dispatch]
  )

  const onKeyDownModal = useCallback(
    (commOId: string, clubName: string) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        _executeAdd(commOId, clubName)
      } // ::
      else if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    },
    [_executeAdd, dispatch, closeModal]
  )

  const onSubmit = useCallback(
    (commOId: string, clubName: string) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeAdd(commOId, clubName)
    },
    [_executeAdd]
  )

  return (
    <Modal
      className={`ClubAdd_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => {}}
      onKeyDown={onKeyDownModal(commOId, clubName)}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">클럽 추가</p>

      {/* 2. 유저 생성 Form (ID, PW) */}
      <form className="_form_modal" onSubmit={onSubmit(commOId, clubName)}>
        {/* 2-1. 아이디 */}
        <div className="_label_block_form">
          <label htmlFor="clubName">클럽 이름</label>
          <input
            autoFocus
            className="_input_clubName_form"
            id="clubName_modal"
            onChange={e => setClubName(e.currentTarget.value)}
            placeholder="클럽 이름을 입력하세요"
            required={true}
            type="text"
            value={clubName}
          />
        </div>

        <div className="_button_row_form">
          {/* 2-3. 추가하기 */}
          <button type="submit" className="_button_form">
            추가하기
          </button>

          {/* 2-4. 취소하기 */}
          <button type="button" className="_button_form" onClick={() => dispatch(closeModal())}>
            취소하기
          </button>
        </div>
      </form>
    </Modal>
  )
}
