import {useCallback} from 'react'

import {Icon} from '@component'
import {useAppDispatch, useModalActions} from '@store'

import type {FC, MouseEvent} from 'react'
import type {SpanCommonProps} from '@prop'

import '../_styles/AddMemberButton.scss'

type AddMemberButtonProps = SpanCommonProps & {}

export const AddMemberButton: FC<AddMemberButtonProps> = ({className, style, ...props}) => {
  const {openModalAddMember} = useModalActions()

  const dispatch = useAppDispatch()

  const onClickButton = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      dispatch(openModalAddMember())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <Icon
      iconName="add"
      className={`AddMember_Button ${className || ''}`}
      onClick={onClickButton}
      style={style}
      {...props} // ::
    />
  )
}
