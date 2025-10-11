import {useCallback} from 'react'

import {Icon} from '@component'
import {useAppDispatch} from '@store'
import {toggleLefterIsOpen} from '@store'

import type {FC, MouseEvent} from 'react'
import type {SpanCommonProps} from '@prop'

type LefterToggleButtonProps = SpanCommonProps & {}

export const LefterToggleButton: FC<LefterToggleButtonProps> = ({className, style, ...props}) => {
  const dispatch = useAppDispatch()

  const onClickButton = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      dispatch(toggleLefterIsOpen())
    },
    [dispatch]
  )

  return (
    <Icon
      className={`LefterToggle_Button ${className || ''}`}
      iconName="menu"
      onClick={onClickButton}
      style={style}
      {...props} // ::
    />
  )
}
