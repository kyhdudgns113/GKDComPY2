import {useCallback} from 'react'
import {useChatCallbacksContext} from '@context'
import {useChatStates, useClubStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ChatType} from '@shareType'

import '../_style/ChatPrevLoadButton.scss'

type ChatPrevLoadButtonProps = DivCommonProps & {}

export const ChatPrevLoadButton: FC<ChatPrevLoadButtonProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {chatArr} = useChatStates()
  const {loadClubChatArr} = useChatCallbacksContext()

  const onClickPrev = useCallback(
    (clubOId: string, chatArr: ChatType[]) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (chatArr.length > 0 && chatArr[0].chatIdx > 0) {
        loadClubChatArr(clubOId, chatArr[0].chatIdx)
      }
    },
    [loadClubChatArr]
  )

  return (
    <div
      className={`ChatPrevLoad_Button ${className || ''}`}
      onClick={onClickPrev(clubOpened.clubOId, chatArr)}
      style={style}
      {...props} // ::
    >
      이전 채팅 불러오기
    </div>
  )
}
