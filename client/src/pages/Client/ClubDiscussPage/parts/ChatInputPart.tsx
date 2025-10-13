import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ChatInputPartProps = DivCommonProps & {}

export const ChatInputPart: FC<ChatInputPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`ChatInput_Part ${className || ''}`} style={style} {...props}>
      ChatInputPart
    </div>
  )
}
