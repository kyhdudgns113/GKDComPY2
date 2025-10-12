import {useCommunityStates} from '@store'

import {UserListPart, ClubListPart, MemberListPart} from './parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_style/ClientMainPage.scss'

type ClientMainPageProps = DivCommonProps & {}

export const ClientMainPage: FC<ClientMainPageProps> = ({className, style, ...props}) => {
  const {community} = useCommunityStates()

  return (
    <div className={`ClientMain_Page ClientPages ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_page">{community.commName} 운영진들의 공간입니다.</p>

      <div className="_container_page">
        <UserListPart />
        <ClubListPart />
        <MemberListPart />
      </div>
    </div>
  )
}
