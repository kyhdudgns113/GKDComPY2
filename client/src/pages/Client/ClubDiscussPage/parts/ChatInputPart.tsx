import {Icon} from '@component'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/ChatInputPart.scss'

type ChatInputPartProps = DivCommonProps & {}

export const ChatInputPart: FC<ChatInputPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`ChatInput_Part ${className || ''}`} style={style} {...props}>
      <div className="_container_input">
        <textarea className="_input_chat" />
      </div>
      <Icon iconName="send" className="_button_send" />
    </div>
  )
}
