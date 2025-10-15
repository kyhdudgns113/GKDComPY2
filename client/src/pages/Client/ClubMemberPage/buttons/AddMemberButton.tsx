import {Icon} from '@component'

import type {FC} from 'react'
import type {SpanCommonProps} from '@prop'

import '../_styles/AddMemberButton.scss'

type AddMemberButtonProps = SpanCommonProps & {}

export const AddMemberButton: FC<AddMemberButtonProps> = ({className, style, ...props}) => {
  return <Icon iconName="add" className={`AddMember_Button ${className || ''}`} style={style} {...props} />
}
