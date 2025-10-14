import {useCallback, useState} from 'react'

import {Icon} from '@component'
import {useChatCallbacksContext, useSocketStatesContext} from '@context'
import {useChatStates} from '@store'

import type {ChangeEvent, FC, KeyboardEvent, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {SocketType} from '@type'

import '../_style/ChatInputPart.scss'

type ChatInputPartProps = DivCommonProps & {}

export const ChatInputPart: FC<ChatInputPartProps> = ({className, style, ...props}) => {
  const {chatRoomOId} = useChatStates()
  const {socket} = useSocketStatesContext()
  const {chatMessage} = useChatCallbacksContext()

  const [contents, setContents] = useState<string>('')

  const _executeChat = useCallback(
    (socket: SocketType, chatRoomOId: string, contents: string) => {
      if (!socket || !chatRoomOId) {
        alert('소켓 또는 채팅방 OId가 없습니다.')
        return
      }

      if (contents.trim() === '') {
        setContents('')
        return
      }

      chatMessage(socket, chatRoomOId, contents)
      setContents('')
    },
    [chatMessage]
  )

  const onChangeInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.currentTarget.value)
  }, [])

  const onClickSend = useCallback(
    (socket: SocketType, chatRoomOId: string, contents: string) => (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      _executeChat(socket, chatRoomOId, contents)
    },
    [_executeChat]
  )

  const onKeyDownInput = useCallback(
    (socket: SocketType, chatRoomOId: string, contents: string) => (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        _executeChat(socket, chatRoomOId, contents)
      } // ::
    },
    [_executeChat]
  )

  return (
    <div className={`ChatInput_Part ${className || ''}`} style={style} {...props}>
      <div className="_container_input">
        <textarea className="_input_chat" onChange={onChangeInput} onKeyDown={onKeyDownInput(socket, chatRoomOId, contents)} value={contents} />
      </div>
      <Icon iconName="send" className="_button_send" onClick={onClickSend(socket, chatRoomOId, contents)} />
    </div>
  )
}
