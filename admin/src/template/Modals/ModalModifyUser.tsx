import {useCallback, useEffect, useState} from 'react'
import {Modal} from '@component'
import {useCommunityCallbacksContext} from '@context'
import {useAppDispatch, useAppSelector} from '@store'
import {closeModal, selectSelectedUser, unselectUser} from '@store'

import type {FC, FormEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {UserType} from '@shareType'

import './_ModalsStyles.scss'
import {AUTH_GOLD, AUTH_NORMAL, AUTH_SILVER} from '@secret'

type ModalModifyUserProps = DivCommonProps & {}

export const ModalModifyUser: FC<ModalModifyUserProps> = ({className, style, ...props}) => {
  const {modifyCommunityUser} = useCommunityCallbacksContext()

  const [newUserId, setNewUserId] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [newCommAuth, setNewCommAuth] = useState<number>(AUTH_NORMAL)

  const dispatch = useAppDispatch()
  const selectedUser = useAppSelector(selectSelectedUser)

  const onSubmit = useCallback(
    (user: UserType, newUserId: string, newPassword: string, newCommAuth: number) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const isSameUserId = !newUserId || newUserId === user.userId
      const isSamePassword = !newPassword
      const isSameCommAuth = newCommAuth === user.commAuth

      if (isSameUserId && isSamePassword && isSameCommAuth) {
        return
      }

      modifyCommunityUser(user.userOId, newUserId, newPassword, newCommAuth) // ::
        .then(res => {
          if (res) {
            alert('유저 수정 성공')
            dispatch(closeModal())
            dispatch(unselectUser())
          }
        })
    },
    [modifyCommunityUser, dispatch]
  )

  // 초기화: useState 값들
  useEffect(() => {
    setNewUserId(selectedUser.userId)
    setNewCommAuth(selectedUser.commAuth)
  }, [selectedUser])

  return (
    <Modal
      className={`Modal_ModifyUser ${className || ''}`}
      onClose={() => {
        dispatch(closeModal())
        dispatch(unselectUser())
      }}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">유저 수정</p>

      {/* 2. 유저 수정 Form (ID, PW) */}
      <form className="_form_modify_user" onSubmit={onSubmit(selectedUser, newUserId, newPassword, newCommAuth)}>
        <div className="_label_block_form">
          <label htmlFor="userId">아이디</label>
          <input
            className="_input_userId_form"
            id="userId_modal"
            onChange={e => setNewUserId(e.currentTarget.value)}
            placeholder="입력 안하면 안바뀝니다"
            required={true}
            type="text"
            value={newUserId}
          />
        </div>

        <div className="_label_block_form">
          <label htmlFor="password">비밀번호</label>
          <input
            className="_input_password_form"
            id="password_modal"
            onChange={e => setNewPassword(e.currentTarget.value)}
            placeholder="입력 안하면 안바뀝니다"
            type="password"
            value={newPassword}
          />
        </div>

        <div className="_label_block_form">
          <label>권한</label>
          <div className="_button_group_auth">
            <button
              type="button"
              className={`_button_auth ${newCommAuth === AUTH_GOLD ? '_selected' : ''}`}
              onClick={() => setNewCommAuth(AUTH_GOLD)}
            >
              클마
            </button>
            <button
              type="button"
              className={`_button_auth ${newCommAuth === AUTH_SILVER ? '_selected' : ''}`}
              onClick={() => setNewCommAuth(AUTH_SILVER)}
            >
              부마
            </button>
            <button
              type="button"
              className={`_button_auth ${newCommAuth === AUTH_NORMAL ? '_selected' : ''}`}
              onClick={() => setNewCommAuth(AUTH_NORMAL)}
            >
              일반
            </button>
          </div>
        </div>

        <button type="submit" className="_button_form">
          수정하기
        </button>

        <button
          type="button"
          className="_button_form"
          onClick={() => {
            dispatch(unselectUser())
            dispatch(closeModal())
          }}
        >
          취소하기
        </button>
      </form>
    </Modal>
  )
}
