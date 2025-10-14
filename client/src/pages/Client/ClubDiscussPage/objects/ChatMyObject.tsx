import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ChatType} from '@shareType'

type ChatMyObjectProps = DivCommonProps & {chat: ChatType}

export const ChatMyObject: FC<ChatMyObjectProps> = ({chat, className, style, ...props}) => {
  return (
    <div className={`ChatMy_Object ${className || ''}`} style={style} {...props}>
      {chat.content}
    </div>
  )
}
