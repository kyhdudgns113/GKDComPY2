import type {FC} from 'react'
import type {SpanCommonProps} from '@prop'
import type {Setter} from '@type'

import {Icon} from '@component'
import '../_styles/MoveMemberButton.scss'

type MoveMemberButtonProps = SpanCommonProps & {
  setter: Setter<boolean>
}

export const MoveMemberButton: FC<MoveMemberButtonProps> = ({setter, className, style, ...props}) => {
  return (
    <Icon
      onClick={() => setter(prev => !prev)}
      className={`MoveMember_Button ${className || ''}`}
      iconName="delivery_truck_speed"
      style={style}
      {...props} // ::
    />
  )
}
