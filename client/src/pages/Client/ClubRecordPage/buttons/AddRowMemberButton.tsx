import {useCallback} from 'react'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'
import {useAppDispatch, useModalActions} from '@store'

import '../_styles/BTN_AddRowMember.scss'

type AddRowMemberButtonProps = ButtonCommonProps & {}

export const AddRowMemberButton: FC<AddRowMemberButtonProps> = ({className, style, ...props}) => {
  const {openModalAddRowMember} = useModalActions()

  const dispatch = useAppDispatch()

  const onClickButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      dispatch(openModalAddRowMember())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <button className={`AddRowMember_Button ${className || ''}`} onClick={onClickButton} style={style} {...props}>
      멤버 추가
    </button>
  )
}
