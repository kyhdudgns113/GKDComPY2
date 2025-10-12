import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useAuthStatesContext, useCommunityCallbacksContext} from '@context'
import {useAppDispatch, useModalActions} from '@store'

import type {FC, FormEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/UserAddModal.scss'

type UserAddModalProps = DivCommonProps & {}

export const UserAddModal: FC<UserAddModalProps> = ({className, style, ...props}) => {
  const {closeModal} = useModalActions()
  const {commOId} = useAuthStatesContext() // eslint-disable-line

  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useAppDispatch()

  const {addCommunityUser} = useCommunityCallbacksContext()

  const onSubmit = useCallback(
    (commOId: string, userId: string, password: string) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      addCommunityUser(commOId, userId, password) // ::
        .then(res => {
          if (res) {
            alert('유저 추가 성공')
            dispatch(closeModal())
          }
        })
    },
    [addCommunityUser, dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <Modal
      className={`UserAdd_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => dispatch(closeModal())}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">유저 추가</p>

      {/* 2. 유저 생성 Form (ID, PW) */}
      <form className="_form_modal" onSubmit={onSubmit(commOId, userId, password)}>
        {/* 2-1. 아이디 */}
        <div className="_label_block_form">
          <label htmlFor="userId">아이디</label>
          <input
            className="_input_userId_form"
            id="userId_modal"
            onChange={e => setUserId(e.currentTarget.value)}
            placeholder="아이디를 입력하세요"
            required={true}
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
            placeholder="비밀번호를 입력하세요"
            required={true}
            type="text"
            value={password}
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
