import {MemberListSubpage, MemberInfoSubpage} from './subpages'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/ClubMemberPage.scss'

type ClubMemberPageProps = DivCommonProps & {}

export const ClubMemberPage: FC<ClubMemberPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClubMember_Page CliengPages ${className || ''}`} style={style} {...props}>
      <div className="_container_page">
        <MemberListSubpage />
        <MemberInfoSubpage />
      </div>
    </div>
  )
}
