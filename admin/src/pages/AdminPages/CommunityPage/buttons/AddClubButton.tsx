import {useCallback} from 'react'

import {useAppDispatch} from '@store'
import {openModalAddClub} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

type AddClubButtonProps = ButtonCommonProps & {}

export const AddClubButton: FC<AddClubButtonProps> = ({className, style, ...props}) => {
  const dispatch = useAppDispatch()

  const onClickButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      dispatch(openModalAddClub())
    },
    [dispatch]
  )

  return (
    <button
      className={`AddClub_Button ${className || ''}`}
      onClick={onClickButton}
      style={style}
      {...props} // ::
    >
      클럽 추가
    </button>
  )
}
