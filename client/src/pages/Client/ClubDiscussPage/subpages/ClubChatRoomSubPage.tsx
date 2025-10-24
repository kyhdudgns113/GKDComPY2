import {useEffect} from 'react'

import {useChatCallbacksContext} from '@context'
import {useChatActions, useAppDispatch, useClubStates} from '@store'

import {ChatArrPart, ChatInputPart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

import '../_style/ClubChatRoomSubPage.scss'

type ClubChatRoomSubPageProps = DivCommonProps & {club: ClubType}

export const ClubChatRoomSubPage: FC<ClubChatRoomSubPageProps> = ({club, className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {loadClubChatArr} = useChatCallbacksContext()
  const {setChatRoomOId, resetChatArr, resetChatRoomOId, resetChatQueue} = useChatActions()

  const dispatch = useAppDispatch()

  // 초기화: 채팅 내용 불러오기
  useEffect(() => {
    if (!clubOpened || clubOpened.clubOId === '') {
      return
    }

    loadClubChatArr(clubOpened.clubOId, -1)
    dispatch(setChatRoomOId(clubOpened.chatRoomOId))

    return () => {
      dispatch(resetChatArr())
      dispatch(resetChatRoomOId())
      dispatch(resetChatQueue())
    }
  }, [clubOpened, dispatch, loadClubChatArr]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`ClubChatRoom_SubPage ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_subpage">{club.clubName} 채팅방</p>

      {/* 2. 채팅방 내용 창 */}
      <ChatArrPart />

      {/* 3. 채팅 입력 창 */}
      <ChatInputPart />
    </div>
  )
}
