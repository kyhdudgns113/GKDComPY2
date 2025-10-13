import {useEffect} from 'react'
import {useDocumentCallbacksContext, useChatCallbacksContext} from '@context'
import {useClubStates} from '@store'

import {ClubChatRoomSubPage, ClubDocSubPage} from './subpages'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ClubDiscussPage.scss'

type ClubDiscussPageProps = DivCommonProps & {}

export const ClubDiscussPage: FC<ClubDiscussPageProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {loadClubDocument} = useDocumentCallbacksContext()
  const {loadClubChatArr} = useChatCallbacksContext()

  // 초기화: 문서 내용 불러오기
  useEffect(() => {
    if (!clubOpened || clubOpened.clubOId === '') {
      return
    }

    loadClubChatArr(clubOpened.clubOId, -1)
    loadClubDocument(clubOpened.clubOId)
  }, [clubOpened, loadClubChatArr, loadClubDocument])

  return (
    <div className={`ClubDiscuss_Page CliengPages ${className || ''}`} style={style} {...props}>
      {/* 2. 컨테이너 */}
      <div className="_container_page">
        {/* 2-1. 회의록  */}
        <ClubDocSubPage club={clubOpened} />

        {/* 2-2. 채팅방 */}
        <ClubChatRoomSubPage club={clubOpened} />
      </div>
    </div>
  )
}
