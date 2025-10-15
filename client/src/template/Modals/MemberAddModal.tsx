import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useAuthStatesContext, useMemberCallbacksContext} from '@context'
import {useAppDispatch, useClubStates, useModalActions} from '@store'

import type {FC, FormEvent, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ModalCommon.scss'
import './_style/MemberAddModal.scss'

type MemberAddModalProps = DivCommonProps & {}

export const MemberAddModal: FC<MemberAddModalProps> = ({className, style, ...props}) => {
  const {closeModal} = useModalActions()
  const {clubOpened} = useClubStates()

  const {commOId} = useAuthStatesContext()
  const {addClubMember} = useMemberCallbacksContext()

  const [memName, setMemName] = useState<string>('')
  const [batterPower, setBatterPower] = useState<number>(0)
  const [pitcherPower, setPitcherPower] = useState<number>(0)

  const dispatch = useAppDispatch()

  const _executeAdd = useCallback(
    (commOId: string, clubOId: string, memName: string, batterPower: number, pitcherPower: number) => {
      if (!memName || !batterPower || !pitcherPower) {
        alert('모든 필드를 입력해주세요.')
        return
      }

      addClubMember(commOId, clubOId, memName, batterPower, pitcherPower) // ::
        .then(res => {
          if (res) {
            alert('멤버 추가 성공')
            dispatch(closeModal())
          }
        })
    },
    [addClubMember, closeModal, dispatch]
  )

  const onKeyDownModal = useCallback(
    (commOId: string, clubOId: string, memName: string, batterPower: number, pitcherPower: number) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        _executeAdd(commOId, clubOId, memName, batterPower, pitcherPower)
      } // ::
      else if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    },
    [_executeAdd, dispatch, closeModal]
  )

  const onSubmit = useCallback(
    (commOId: string, clubOId: string, memName: string, batterPower: number, pitcherPower: number) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeAdd(commOId, clubOId, memName, batterPower, pitcherPower)
    },
    [_executeAdd]
  )

  return (
    <Modal
      className={`MemberAdd_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => dispatch(closeModal())}
      onKeyDown={onKeyDownModal(commOId, clubOpened.clubOId, memName, batterPower, pitcherPower)}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">멤버 추가</p>

      {/* 2. 유저 생성 Form (ID, PW) */}
      <form className="_form_modal" onSubmit={onSubmit(commOId, clubOpened.clubOId, memName, batterPower, pitcherPower)}>
        {/* 2-1. 닉네임 */}
        <div className="_label_block_form">
          <label htmlFor="memName">닉네임</label>
          <input
            autoFocus
            className="_input_memName_form"
            id="memName_modal"
            onChange={e => setMemName(e.currentTarget.value)}
            placeholder="닉네임를 입력하세요"
            required={true}
            type="text"
            value={memName}
          />
        </div>

        {/* 2-2. 타자력 */}
        <div className="_label_block_form">
          <label htmlFor="batterPower">타자력</label>
          <input
            className="_input_batterPower_form"
            id="batterPower_modal"
            onChange={e => setBatterPower(Number(e.currentTarget.value))}
            placeholder="타자력를 입력하세요"
            required={true}
            type="number"
            value={batterPower}
          />
        </div>

        {/* 2-2. 투수력 */}
        <div className="_label_block_form">
          <label htmlFor="pitcherPower">투수력</label>
          <input
            className="_input_pitcherPower_form"
            id="pitcherPower_modal"
            onChange={e => setPitcherPower(Number(e.currentTarget.value))}
            placeholder="투수력를 입력하세요"
            required={true}
            type="number"
            value={pitcherPower}
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
