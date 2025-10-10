import {Modal} from '@component'
import {useCommunityCallbacksContext} from '@context'
import {useAppDispatch, useAppSelector} from '@store'
import {closeModal, selectSelectedCommunity} from '@store'
import {useCallback, useState} from 'react'

import type {FC, FormEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {CommunityType} from '@shareType'

import './_ModalsStyles.scss'

type ModalAddUserProps = DivCommonProps & {}

export const ModalAddUser: FC<ModalAddUserProps> = ({className, style, ...props}) => {
  const {addCommunityUser} = useCommunityCallbacksContext()

  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  const onSubmit = useCallback(
    (selectedCommunity: CommunityType, userId: string, password: string) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const {commOId} = selectedCommunity

      if (!commOId) return

      addCommunityUser(commOId, userId, password) // ::
        .then(res => {
          if (res) {
            alert('유저 추가 성공')
            dispatch(closeModal())
          }
        })
    },
    [addCommunityUser, dispatch] // addCommunityUser 가 dispatch 에 의존성이 있어서 여기 넣어줘야 한다
  )

  return (
    <Modal onClose={() => dispatch(closeModal())} className={`Modal_AddUser ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_modal">유저 추가</p>

      {/* 2. 유저 생성 Form (ID, PW, commAuth) */}
      <form className="_form_add" onSubmit={onSubmit(selectedCommunity, userId, password)}>
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

        <div className="_label_block_form">
          <label htmlFor="password">비밀번호</label>
          <input
            className="_input_password_form"
            id="password_modal"
            onChange={e => setPassword(e.currentTarget.value)}
            placeholder="비밀번호를 입력하세요"
            required={true}
            type="password"
            value={password}
          />
        </div>

        <button type="submit" className="_button_form">
          추가하기
        </button>

        <button
          type="button"
          className="_button_form"
          onClick={() => {
            dispatch(closeModal())
          }}
        >
          취소하기
        </button>
      </form>
    </Modal>
  )
}
