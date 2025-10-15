import {useMemberStates} from '@store'

import {MemberDeckPart, MemberSpecPart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberInfoSubpage.scss'

type MemberInfoSubpageProps = DivCommonProps & {}

export const MemberInfoSubpage: FC<MemberInfoSubpageProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()

  if (clubMemberOpened.memOId === '') {
    return (
      <div className={`MemberInfo_Subpage _No_Member ${className || ''}`} style={style} {...props}>
        <p>&nbsp;</p>
      </div>
    )
  }

  return (
    <div className={`MemberInfo_Subpage ${className || ''}`} style={style} {...props}>
      <MemberSpecPart />
      <MemberDeckPart />
    </div>
  )
}
