import {useCallback} from 'react'

import type {FC, MouseEvent} from 'react'
import type {SpanCommonProps} from '@prop'
import type {Setter} from '@type'

import {Icon} from '@component'
import '../_styles/MoveMemberButton.scss'

type MoveMemberButtonProps = SpanCommonProps & {
  setter: Setter<boolean>
}

export const MoveMemberButton: FC<MoveMemberButtonProps> = ({setter, className, style, ...props}) => {
  const onClickMoveIcon = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      setter(prev => !prev)
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <Icon
      onClick={onClickMoveIcon}
      className={`MoveMember_Button ${className || ''}`}
      iconName="delivery_truck_speed"
      style={style}
      {...props} // ::
    />
  )
}
