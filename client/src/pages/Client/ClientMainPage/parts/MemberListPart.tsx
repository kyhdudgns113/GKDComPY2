import {useCommunityStates} from '@store'

import {MemberTableObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/MemberListPart.scss'

type MemberListPartProps = DivCommonProps & {}

export const MemberListPart: FC<MemberListPartProps> = ({className, style, ...props}) => {
  const {commMemberArr} = useCommunityStates()

  return (
    <div className={`MemberList_Part ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_part">멤버 목록 : {commMemberArr.length}</p>

      {/* 2. 멤버 목록 */}
      <MemberTableObject />
    </div>
  )
}
