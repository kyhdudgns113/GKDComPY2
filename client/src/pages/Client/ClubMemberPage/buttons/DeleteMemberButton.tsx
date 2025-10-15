import {Icon} from '@component'

import type {FC} from 'react'
import type {SpanCommonProps} from '@prop'

import '../_styles/DeleteMemberButton.scss'

type DeleteMemberButtonProps = SpanCommonProps & {}

export const DeleteMemberButton: FC<DeleteMemberButtonProps> = ({className, style, ...props}) => {
  return (
    <Icon
      className={`DeleteMember_Button ${className || ''}`}
      iconName="cancel"
      style={style}
      {...props} // ::
    />
  )
}
