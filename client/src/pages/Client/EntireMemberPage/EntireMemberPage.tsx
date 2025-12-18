import {useAppSelector} from '@store'

import {ButtonRowPart, ClubMemberListPart} from './parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/_CommonStyles.scss'
import './EntireMemberPage.scss'

type EntireMemberPageProps = DivCommonProps & {}

export const EntireMemberPage: FC<EntireMemberPageProps> = ({className, style, ...props}) => {
  const community = useAppSelector(state => state.Community.community)
  const clubArr = useAppSelector(state => state.Community.clubArr)

  return (
    <div className={`EntireMember_Page ClientPages ${className || ''}`} style={style} {...props}>
      <div className="_container_page">
        {/* 1. 타이틀 */}
        <p className="_title_page">{community.commName} 전체 멤버 페이지</p>

        {/* 2. 버튼 행 */}
        <ButtonRowPart />

        <div className="_container_club_arr_part">
          {/* 3. 클럽별 멤버 목록 */}
          {clubArr.map((club, clubIdx) => (
            <ClubMemberListPart key={clubIdx} clubOId={club.clubOId} colorIdx={clubIdx} />
          ))}

          {/* 4. 후보군 클럽 멤버 목록 */}
          <ClubMemberListPart clubOId={community.subClubOId} colorIdx={clubArr.length} />
        </div>
      </div>
    </div>
  )
}
