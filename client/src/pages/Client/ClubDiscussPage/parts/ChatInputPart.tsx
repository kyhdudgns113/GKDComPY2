import {useCallback, useState} from 'react'

import {Icon} from '@component'
import {useChatCallbacksContext, useSocketStatesContext} from '@context'
import {useChatStates} from '@store'

import type {ChangeEvent, FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {SocketType} from '@type'

import '../_style/ChatInputPart.scss'

type ChatInputPartProps = DivCommonProps & {}

export const ChatInputPart: FC<ChatInputPartProps> = ({className, style, ...props}) => {
  const {chatRoomOId} = useChatStates()
  const {socket} = useSocketStatesContext()
  const {chatMessage} = useChatCallbacksContext()

  const [contents, setContents] = useState<string>('')

  const onChangeInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.currentTarget.value)
  }, [])

  const onClickSend = useCallback(
    (socket: SocketType, chatRoomOId: string, contents: string) => (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      chatMessage(socket, chatRoomOId, contents)
      setContents('')
    },
    [chatMessage]
  )

  return (
    <div className={`ChatInput_Part ${className || ''}`} style={style} {...props}>
      <div className="_container_input">
        <textarea className="_input_chat" onChange={onChangeInput} value={contents} />
      </div>
      <Icon iconName="send" className="_button_send" onClick={onClickSend(socket, chatRoomOId, contents)} />
    </div>
  )
}
