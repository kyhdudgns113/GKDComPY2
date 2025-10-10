import {Modal} from '@component'
import {useCommunityCallbacksContext} from '@context'
import {useAppDispatch, useAppSelector} from '@store'
import {closeModal, selectSelectedCommunity} from '@store'
import {useCallback, useState} from 'react'

import type {FC, FormEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {CommunityType} from '@shareType'

import './_ModalsStyles.scss'

type ModalAddClubProps = DivCommonProps & {}

export const ModalAddClub: FC<ModalAddClubProps> = ({className, style, ...props}) => {
  const {addCommunityClub} = useCommunityCallbacksContext()

  const [clubName, setClubName] = useState('')

  const dispatch = useAppDispatch()
  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  const onSubmit = useCallback(
    (selectedCommunity: CommunityType, clubName: string) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const {commOId} = selectedCommunity

      if (!commOId) return

      addCommunityClub(commOId, clubName) // ::
        .then(res => {
          if (res) {
            alert('클럽 추가 성공')
            dispatch(closeModal())
          }
        })
    },
    [addCommunityClub, dispatch] // addCommunityClub 가 dispatch 에 의존성이 있어서 여기 넣어줘야 한다
  )

  return (
    <Modal onClose={() => dispatch(closeModal())} className={`Modal_AddClub ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_modal">클럽 추가</p>

      {/* 2. 유저 생성 Form (ID, PW, commAuth) */}
      <form className="_form_add" onSubmit={onSubmit(selectedCommunity, clubName)}>
        <div className="_label_block_form">
          <label htmlFor="clubName">클럽 이름</label>
          <input
            className="_input_clubName_form"
            id="clubName_modal"
            onChange={e => setClubName(e.currentTarget.value)}
            placeholder="클럽 이름을 입력하세요"
            required={true}
            type="text"
            value={clubName}
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
