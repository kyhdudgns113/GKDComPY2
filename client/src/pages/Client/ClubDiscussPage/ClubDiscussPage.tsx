import {useTemplateStates} from '@store'

import {ClubChatRoomSubPage, ClubDocSubPage} from './subpages'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ClubDiscussPage.scss'

type ClubDiscussPageProps = DivCommonProps & {}

export const ClubDiscussPage: FC<ClubDiscussPageProps> = ({className, style, ...props}) => {
  const {clubOpened} = useTemplateStates()

  return (
    <div className={`ClubDiscuss_Page CliengPages ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_page">{clubOpened.clubName} 클럽 기록 페이지</p>

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
