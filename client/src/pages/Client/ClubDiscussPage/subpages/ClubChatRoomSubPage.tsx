import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubChatRoomSubPageProps = DivCommonProps & {club: ClubType}

export const ClubChatRoomSubPage: FC<ClubChatRoomSubPageProps> = ({club, className, style, ...props}) => {
  return (
    <div className={`ClubChatRoom_SubPage ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_subpage">{club.clubName} 채팅방</p>
    </div>
  )
}
