import {useCallback} from 'react'

import {Icon} from '@component'
import {useAppDispatch, useTemplateActions} from '@store'

import type {FC, MouseEvent} from 'react'
import type {SpanCommonProps} from '@prop'

import './LefterToggleButton.scss'

type LefterToggleButtonProps = SpanCommonProps & {}

export const LefterToggleButton: FC<LefterToggleButtonProps> = ({className, style, ...props}) => {
  const {toggleLefterIsOpen} = useTemplateActions()

  const dispatch = useAppDispatch()

  const onClickButton = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      dispatch(toggleLefterIsOpen())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
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
