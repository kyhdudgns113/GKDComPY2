import {useAppSelector} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {EMemberType} from '@shareType'

import './EMemberRowObj.scss'

type EMemberRowObjProps = Omit<DivCommonProps, 'style'> & {
  clubOId: string
  eMember: EMemberType
  posIdx: number
}

/* eslint-disable */
export const EMemberRowObj: FC<EMemberRowObjProps> = ({clubOId, eMember, posIdx, className, ...props}) => {
  const {memName, batterPower, pitcherPower} = eMember
  const totalPower = batterPower + pitcherPower

  const clubArr = useAppSelector(state => state.Community.clubArr)
  const numClubs = clubArr.length + 1 // 클럽수 + 후보군 (탈퇴는 안 셈)
  const colorIdx = (clubArr.findIndex(club => club.clubOId === clubOId) + numClubs) % numClubs
  const angle = Math.floor(360 / numClubs) * colorIdx

  const cnBw2 = posIdx % 5 === 4 ? '_bw_4' : ''
  const cnBgAngle = `block_bg_angle_${angle}`

  return (
    <div className={`EMemberRow_Obj ${cnBw2} ${cnBgAngle} ${className || ''}`} {...props}>
      <p className="_name_row _width_name_part">{memName}</p>
      <p className="_batter_row _width_batter_part">{batterPower.toLocaleString()}</p>
      <p className="_pitcher_row _width_pitcher_part">{pitcherPower.toLocaleString()}</p>
      <p className="_total_row _width_total_part">{totalPower.toLocaleString()}</p>
    </div>
  )
}
