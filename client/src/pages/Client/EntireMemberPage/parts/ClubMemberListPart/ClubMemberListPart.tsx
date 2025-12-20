import {useAppSelector} from '@store'

import {ArrHeaderObj, EMemberRowObj} from '../../objects'
import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as NV from '@nullValue'

import './ClubMemberListPart.scss'

type ClubMemberListPartProps = DivCommonProps & {
  clubOId: string
  colorIdx: number
}

export const ClubMemberListPart: FC<ClubMemberListPartProps> = ({clubOId, colorIdx, ...props}) => {
  const clubArr = useAppSelector(state => state.Community.clubArr)
  const eMemberArr = useAppSelector(state => state.EMember.eMembers[clubOId] || [])
  const numClubs = clubArr.length + 1 // 클럽수 + 후보군 (탈퇴는 안 셈)
  const angle = Math.floor(360 / numClubs) * colorIdx

  const club = clubArr.find(club => club.clubOId === clubOId) || NV.NULL_CLUB()
  const clubName = club.clubName || '후보군'

  const cnAngle = `block_angle_${angle}`

  return (
    <div className={`ClubMemberList_Part ${cnAngle}`} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_part">{clubName}</p>

      {/* 2. 배열 헤더 */}
      <ArrHeaderObj clubOId={clubOId} className={cnAngle} />

      {/* 3. 멤버행 배열 */}
      {eMemberArr.map((eMember, eMemberIdx) => (
        <EMemberRowObj key={eMemberIdx} clubOId={clubOId} eMember={eMember} posIdx={eMemberIdx} />
      ))}

      {/* 4. 드래그 드랍용 빈 공간 = padding 으로 대체한다 */}
    </div>
  )
}
