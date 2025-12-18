import {useAppSelector} from '@store'

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
  const numClubs = clubArr.length + 1 // 클럽수 + 후보군 (탈퇴는 안 셈)
  const angle = Math.floor(360 / numClubs) * colorIdx

  const club = clubArr.find(club => club.clubOId === clubOId) || NV.NULL_CLUB()

  return (
    <div className={`ClubMemberList_Part block_angle_${angle}`} {...props}>
      <p className="_title_part">{club.clubName || '후보군'}</p>
    </div>
  )
}
