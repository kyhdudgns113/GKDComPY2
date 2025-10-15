import type {FC} from 'react'
import type {SpanCommonProps} from '@prop'

import {Icon} from '@component'
import '../_styles/MoveMemberButton.scss'

type MoveMemberButtonProps = SpanCommonProps & {}

export const MoveMemberButton: FC<MoveMemberButtonProps> = ({className, style, ...props}) => {
  return (
    <Icon
      className={`MoveMember_Button ${className || ''}`}
      iconName="delivery_truck_speed"
      style={style}
      {...props} // ::
    />
  )
}
