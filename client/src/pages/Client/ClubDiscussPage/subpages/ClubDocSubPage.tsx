import {DocumentContentPart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubDocSubPageProps = DivCommonProps & {club: ClubType}

export const ClubDocSubPage: FC<ClubDocSubPageProps> = ({club, className, style, ...props}) => {
  return (
    <div className={`ClubDoc_SubPage ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_subpage">{club.clubName} 기록지</p>

      {/* 2. 문서 컨테이너 */}
      <DocumentContentPart />
    </div>
  )
}
