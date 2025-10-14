import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ChatType} from '@shareType'

type ChatOtherObjectProps = DivCommonProps & {chat: ChatType; isSameArea: boolean}

export const ChatOtherObject: FC<ChatOtherObjectProps> = ({chat, isSameArea, className, style, ...props}) => {
  return (
    <div className={`ChatOther_Object ${isSameArea ? '_sameArea' : ''} ${className || ''}`} style={style} {...props}>
      {!isSameArea && <div className="_user_name_object">{chat.userId}</div>}
      {chat.content}
    </div>
  )
}
