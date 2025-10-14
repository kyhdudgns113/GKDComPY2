import {useCallback, useState} from 'react'
import {Icon} from '@component'
import {useAuthStatesContext, useChatCallbacksContext, useSocketStatesContext} from '@context'

import type {ChangeEvent, FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {SocketType} from '@type'

import '../_style/ChatInputPart.scss'

type ChatInputPartProps = DivCommonProps & {}

export const ChatInputPart: FC<ChatInputPartProps> = ({className, style, ...props}) => {
  const {userId, userOId} = useAuthStatesContext()
  const {socket} = useSocketStatesContext()
  const {chatMessage} = useChatCallbacksContext()

  const [contents, setContents] = useState<string>('')

  const onChangeInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.currentTarget.value)
  }, [])

  const onClickSend = useCallback(
    (socket: SocketType, userOId: string, userId: string, contents: string) => (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      chatMessage(socket, userOId, userId, contents)
      setContents('')
    },
    [chatMessage]
  )

  return (
    <div className={`ChatInput_Part ${className || ''}`} style={style} {...props}>
      <div className="_container_input">
        <textarea className="_input_chat" onChange={onChangeInput} value={contents} />
      </div>
      <Icon iconName="send" className="_button_send" onClick={onClickSend(socket, userOId, userId, contents)} />
    </div>
  )
}
