import {useCallback} from 'react'

import {Icon} from '@component'
import {useAppDispatch, useModalActions} from '@store'

import type {FC, MouseEvent} from 'react'
import type {SpanCommonProps} from '@prop'

import '../_styles/DeleteMemberButton.scss'

type DeleteMemberButtonProps = SpanCommonProps & {}

export const DeleteMemberButton: FC<DeleteMemberButtonProps> = ({className, style, ...props}) => {
  const dispatch = useAppDispatch()
  const {openModalDelMember} = useModalActions()

  const onClickDelete = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      dispatch(openModalDelMember())
    },
    [dispatch, openModalDelMember]
  )

  return (
    <Icon
      className={`DeleteMember_Button ${className || ''}`}
      onClick={onClickDelete}
      iconName="cancel"
      style={style}
      {...props} // ::
    />
  )
}
