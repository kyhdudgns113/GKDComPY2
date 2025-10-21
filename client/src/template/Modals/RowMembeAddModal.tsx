import {useCallback, useState} from 'react'

import {Modal, Person} from '@component'
import {useRecordCallbacksContext} from '@context'
import {useAppDispatch, useModalActions, useRecordStates} from '@store'

import {GoldCrown, SilverCrown} from '../../pages/Client/ClubMemberPage/components'

import type {FC, FormEvent, KeyboardEvent, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import * as SV from '@shareValue'

import './_style/ModalCommon.scss'
import './_style/RowMembeAddModal.scss'

type RowMembeAddModalProps = DivCommonProps & {}

export const RowMembeAddModal: FC<RowMembeAddModalProps> = ({className, style, ...props}) => {
  const {closeModal} = useModalActions()
  const {weekOIdOpened} = useRecordStates()

  const {addRowMember} = useRecordCallbacksContext()

  const [rowMemName, setRowMemName] = useState<string>('')
  const [batterPower, setBatterPower] = useState<number>(0)
  const [pitcherPower, setPitcherPower] = useState<number>(0)
  const [position, setPosition] = useState<number>(SV.MEMBER_POSITION_NORMAL)

  const dispatch = useAppDispatch()

  const onClickPositionButton = useCallback(
    (newPosition: number) => (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation()
      setPosition(newPosition)
    },
    []
  )

  const _executeAdd = useCallback(
    (weekOId: string, rowMemName: string, batterPower: number, pitcherPower: number, position: number) => {
      if (!rowMemName || !batterPower || !pitcherPower) {
        alert('모든 필드를 입력해주세요.')
        return
      }

      addRowMember(weekOId, rowMemName, batterPower, pitcherPower, position) // ::
        .then(res => {
          if (res) {
            alert('행 멤버 추가 성공')
            dispatch(closeModal())
          }
        })
    },
    [addRowMember, closeModal, dispatch]
  )

  const onKeyDownModal = useCallback(
    (weekOId: string, rowMemName: string, batterPower: number, pitcherPower: number, position: number) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()

        _executeAdd(weekOId, rowMemName, batterPower, pitcherPower, position)
      } // ::
      else if (e.key === 'Escape') {
        dispatch(closeModal())
      }
    },
    [_executeAdd, dispatch, closeModal]
  )

  const onSubmit = useCallback(
    (weekOId: string, rowMemName: string, batterPower: number, pitcherPower: number, position: number) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeAdd(weekOId, rowMemName, batterPower, pitcherPower, position)
    },
    [_executeAdd]
  )

  return (
    <Modal
      className={`RowMembeAdd_Modal __MODAL_COMMON ${className || ''}`}
      onClose={() => {}}
      onKeyDown={onKeyDownModal(weekOIdOpened, rowMemName, batterPower, pitcherPower, position)}
      style={style}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_modal">행 멤버 추가</p>

      {/* 2. 행 멤버 생성 Form */}
      <form className="_form_modal" onSubmit={onSubmit(weekOIdOpened, rowMemName, batterPower, pitcherPower, position)}>
        {/* 2-1. 이름 */}
        <div className="_label_block_form">
          <label htmlFor="rowMemName">이름</label>
          <input
            autoFocus
            className="_input_rowMemName_form"
            id="rowMemName_modal"
            onChange={e => setRowMemName(e.currentTarget.value)}
            placeholder="이름을 입력하세요"
            required={true}
            type="text"
            value={rowMemName}
          />
        </div>

        {/* 2-2. 타자력 */}
        <div className="_label_block_form">
          <label htmlFor="batterPower">타자력</label>
          <input
            className="_input_batterPower_form"
            id="batterPower_modal"
            onChange={e => setBatterPower(Number(e.currentTarget.value))}
            placeholder="타자력을 입력하세요"
            required={true}
            type="number"
            value={batterPower}
          />
        </div>

        {/* 2-3. 투수력 */}
        <div className="_label_block_form">
          <label htmlFor="pitcherPower">투수력</label>
          <input
            className="_input_pitcherPower_form"
            id="pitcherPower_modal"
            onChange={e => setPitcherPower(Number(e.currentTarget.value))}
            placeholder="투수력을 입력하세요"
            required={true}
            type="number"
            value={pitcherPower}
          />
        </div>

        {/* 2-4. 포지션 */}
        <div className="_label_block_form">
          <label>포지션</label>
          <div className="_position_selector_form">
            <GoldCrown
              className={`_position_icon ${position === SV.MEMBER_POSITION_GOLD ? '_selected' : ''}`}
              onClick={onClickPositionButton(SV.MEMBER_POSITION_GOLD)}
            />
            <SilverCrown
              className={`_position_icon ${position === SV.MEMBER_POSITION_SILVER ? '_selected' : ''}`}
              onClick={onClickPositionButton(SV.MEMBER_POSITION_SILVER)}
            />
            <Person
              className={`_position_icon ${position === SV.MEMBER_POSITION_NORMAL ? '_selected' : ''}`}
              onClick={onClickPositionButton(SV.MEMBER_POSITION_NORMAL)}
            />
          </div>
        </div>

        <div className="_button_row_form">
          {/* 2-5. 추가하기 */}
          <button type="submit" className="_button_form">
            추가하기
          </button>

          {/* 2-6. 취소하기 */}
          <button type="button" className="_button_form" onClick={() => dispatch(closeModal())}>
            취소하기
          </button>
        </div>
      </form>
    </Modal>
  )
}
