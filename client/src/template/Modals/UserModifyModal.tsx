import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useCommunityCallbacksContext} from '@context'
import {useAppDispatch, useModalActions, useModalStates} from '@store'

import type {FC, FormEvent, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/UserModifyModal.scss'

type UserModifyModalProps = DivCommonProps & {}

export const UserModifyModal: FC<UserModifyModalProps> = ({className, style, ...props}) => {
  const {closeModal, unselectModifyUser} = useModalActions()
  const {userSelected} = useModalStates()
  const {modifyCommunityUser} = useCommunityCallbacksContext()

  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useAppDispatch()

  const _executeModify = useCallback(
    (userOId: string, userId: string, password: string, commAuth: number) => {
      if ((!userId || userId.trim() === '') && !password) {
        dispatch(closeModal())
        return
      }

      modifyCommunityUser(userOId, userId, password, commAuth) // ::
        .then(res => {
          if (res) {
            alert('유저 수정 성공')
            dispatch(closeModal())
          }
        })
    },
    [modifyCommunityUser, dispatch, closeModal]
  )

  const onClose = useCallback(() => {
    dispatch(closeModal())
    dispatch(unselectModifyUser())
  }, [dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const onKeyDownModal = useCallback(
    (userOId: string, userId: string, password: string, commAuth: number) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        _executeModify(userOId, userId, password, commAuth)
      } // ::
      else if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    },
    [_executeModify, dispatch, closeModal]
  )

  const onSubmit = useCallback(
    (userOId: string, userId: string, password: string, commAuth: number) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeModify(userOId, userId, password, commAuth)
    },
    [_executeModify]
  )

  return (
    <Modal
      className={`UserModify_Modal __MODAL_COMMON ${className || ''}`}
      onClose={onClose}
      onKeyDown={onKeyDownModal(userSelected.userOId, userId, password, userSelected.commAuth)}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">유저 수정</p>

      {/* 2. 유저 생성 Form (ID, PW) */}
      <form className="_form_modal" onSubmit={onSubmit(userSelected.userOId, userId, password, userSelected.commAuth)}>
        {/* 2-1. 아이디 */}
        <div className="_label_block_form">
          <label htmlFor="userId">아이디</label>
          <input
            autoFocus
            className="_input_userId_form"
            id="userId_modal"
            onChange={e => setUserId(e.currentTarget.value)}
            placeholder="빈칸이면 안바뀜"
            type="text"
            value={userId}
          />
        </div>

        {/* 2-2. 비밀번호 */}
        <div className="_label_block_form">
          <label htmlFor="password">비밀번호</label>
          <input
            className="_input_password_form"
            id="password_modal"
            onChange={e => setPassword(e.currentTarget.value)}
            placeholder="빈칸이면 안바뀜"
            type="text"
            value={password}
          />
        </div>

        <div className="_button_row_form">
          {/* 2-3. 수정하기 */}
          <button type="submit" className="_button_form">
            수정하기
          </button>

          {/* 2-4. 취소하기 */}
          <button type="button" className="_button_form" onClick={onClose}>
            취소하기
          </button>
        </div>
      </form>
    </Modal>
  )
}
