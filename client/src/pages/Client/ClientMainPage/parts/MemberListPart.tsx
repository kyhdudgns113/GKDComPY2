import {useCommunityStates} from '@store'

import {MemberTableObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/MemberListPart.scss'

type MemberListPartProps = DivCommonProps & {}

export const MemberListPart: FC<MemberListPartProps> = ({className, style, ...props}) => {
  const {commMemberArr, community} = useCommunityStates()

  return (
    <div className={`MemberList_Part ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_part">
        멤버 목록 : {commMemberArr.filter(member => member.clubOId !== community.banClubOId && member.clubOId !== community.subClubOId).length}
      </p>

      {/* 2. 멤버 목록 */}
      <MemberTableObject />
    </div>
  )
}
