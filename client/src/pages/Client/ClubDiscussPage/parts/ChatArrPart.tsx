import {useAuthStatesContext} from '@context'
import {useChatStates} from '@store'

import {ChatMyObject, ChatOtherObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ChatArrPartProps = DivCommonProps & {}

export const ChatArrPart: FC<ChatArrPartProps> = ({className, style, ...props}) => {
  const {chatArr} = useChatStates()
  const {userOId} = useAuthStatesContext()

  let lastUserOId = ''
  let lastDateValue = new Date(0).valueOf()
  let lastMinute = 0

  return (
    <div className={`ChatArr_Part ${className || ''}`} style={style} {...props}>
      {chatArr.map((chat, idx) => {
        const chatDate = new Date(chat.date)

        const isSameUserWithLast = chat.userOId === lastUserOId
        const isSameMinute = chatDate.getMinutes() === lastMinute
        const isSimilarTime = chatDate.valueOf() - lastDateValue < 1000 * 60 * 3

        const isSameArea = isSameUserWithLast && isSameMinute && isSimilarTime

        lastUserOId = chat.userOId
        lastDateValue = chatDate.valueOf()
        lastMinute = chatDate.getMinutes()

        if (chat.userOId === userOId) {
          return <ChatMyObject chat={chat} key={idx} />
        } // ::
        else {
          return <ChatOtherObject chat={chat} isSameArea={isSameArea} key={idx} />
        }
      })}
    </div>
  )
}
