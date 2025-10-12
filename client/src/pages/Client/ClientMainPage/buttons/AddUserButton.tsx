import {useAppDispatch, useModalActions} from '@store'
import {useCallback} from 'react'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

type AddUserButtonProps = ButtonCommonProps & {}

export const AddUserButton: FC<AddUserButtonProps> = ({className, style, ...props}) => {
  const {openModalAddUser} = useModalActions()

  const dispatch = useAppDispatch()

  const onClickButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      dispatch(openModalAddUser())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <button
      className={`AddUser_Button ${className || ''}`}
      onClick={onClickButton}
      style={style}
      {...props} // ::
    >
      유저 추가
    </button>
  )
}
