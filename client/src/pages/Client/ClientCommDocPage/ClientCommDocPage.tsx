import {useCommunityStates} from '@store'

import {DocContentsPart} from './parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './ClientCommDocPage.scss'

type ClientCommDocPageProps = DivCommonProps & {}

export const ClientCommDocPage: FC<ClientCommDocPageProps> = ({className, style, ...props}) => {
  const {community} = useCommunityStates()

  return (
    <div className={`ClientCommDoc_Page ClientPages ${className || ''}`} style={style} {...props}>
      <div className="_container_page">
        <div className="_header_page">
          {/* 1. 타이틀 */}
          <p className="_title_page">{community.commName} 공통 문서</p>
        </div>

        <DocContentsPart />
      </div>
    </div>
  )
}
