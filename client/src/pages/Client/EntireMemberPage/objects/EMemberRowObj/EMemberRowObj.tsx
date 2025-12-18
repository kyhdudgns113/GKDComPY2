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

  return (
    <div className={`EMemberRow_Obj ${className || ''}`} {...props}>
      <p className="_name_row _width_name_part">{memName}</p>
      <p className="_batter_row _width_batter_part">{batterPower.toLocaleString()}</p>
      <p className="_pitcher_row _width_pitcher_part">{pitcherPower.toLocaleString()}</p>
      <p className="_total_row _width_total_part">{totalPower.toLocaleString()}</p>
    </div>
  )
}
