import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './ArrHeaderObj.scss'

type ArrHeaderObjProps = DivCommonProps & {}

export const ArrHeaderObj: FC<ArrHeaderObjProps> = ({className, ...props}) => {
  return (
    <div className={`ArrHeader_Obj ${className || ''}`} {...props}>
      <p className="_name_header _width_name_part _bd_right">이름</p>
      <p className="_batter_header _width_batter_part _bd_right">타자</p>
      <p className="_pitcher_header _width_pitcher_part _bd_right">투수</p>
      <p className="_total_header _width_total_part">합계</p>
    </div>
  )
}
