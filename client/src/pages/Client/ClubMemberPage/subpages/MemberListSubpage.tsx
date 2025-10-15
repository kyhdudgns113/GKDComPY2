import {useClubStates} from '@store'

import {AddMemberButton} from '../buttons'
import {MemberTablePart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberListSubpage.scss'

type MemberListSubpageProps = DivCommonProps & {}

export const MemberListSubpage: FC<MemberListSubpageProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()

  return (
    <div className={`MemberList_Subpage ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_subpage">{clubOpened.clubName} 멤버</p>

      {/* 2. 멤버 추가 버튼 */}
      <AddMemberButton />

      {/* 3. 멤버 목록 */}
      <MemberTablePart />
    </div>
  )
}
