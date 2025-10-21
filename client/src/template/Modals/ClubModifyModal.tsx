import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useCommunityCallbacksContext} from '@context'
import {useAppDispatch, useModalActions, useModalStates} from '@store'

import type {FC, FormEvent, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/ClubModifyModal.scss'

type ClubModifyModalProps = DivCommonProps & {}

export const ClubModifyModal: FC<ClubModifyModalProps> = ({className, style, ...props}) => {
  const {closeModal, unselectModifyClub} = useModalActions()
  const {clubSelected} = useModalStates()
  const {modifyCommunityClub} = useCommunityCallbacksContext()

  const [clubName, setClubName] = useState<string>('')

  const dispatch = useAppDispatch()

  const _executeModify = useCallback(
    (clubOId: string, clubName: string) => {
      if (!clubName) {
        dispatch(closeModal())
        return
      }

      modifyCommunityClub(clubOId, clubName) // ::
        .then(res => {
          if (res) {
            alert('클럽 수정 성공')
            dispatch(closeModal())
          }
        })
    },
    [modifyCommunityClub, dispatch, closeModal]
  )

  const onClose = useCallback(() => {
    dispatch(closeModal())
    dispatch(unselectModifyClub())
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const onKeyDownModal = useCallback(
    (clubOId: string, clubName: string) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        _executeModify(clubOId, clubName)
      } // ::
      else if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    },
    [_executeModify, dispatch, closeModal]
  )

  const onSubmit = useCallback(
    (clubOId: string, clubName: string) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeModify(clubOId, clubName)
    },
    [_executeModify]
  )

  return (
    <Modal
      className={`ClubModify_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => {}}
      onKeyDown={onKeyDownModal(clubSelected.clubOId, clubName)}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">클럽 수정</p>

      {/* 2. 유저 생성 Form (ID, PW) */}
      <form className="_form_modal" onSubmit={onSubmit(clubSelected.clubOId, clubName)}>
        {/* 2-1. 클럽 이름 */}
        <div className="_label_block_form">
          <label htmlFor="clubName">클럽 이름</label>
          <input
            autoFocus
            className="_input_clubName_form"
            id="clubName_modal"
            onChange={e => setClubName(e.currentTarget.value)}
            placeholder="빈칸이면 안바뀜"
            type="text"
            value={clubName}
          />
        </div>

        <div className="_button_row_form">
          {/* 2-2. 수정하기 */}
          <button type="submit" className="_button_form">
            수정하기
          </button>

          {/* 2-3. 취소하기 */}
          <button type="button" className="_button_form" onClick={onClose}>
            취소하기
          </button>
        </div>
      </form>
    </Modal>
  )
}
