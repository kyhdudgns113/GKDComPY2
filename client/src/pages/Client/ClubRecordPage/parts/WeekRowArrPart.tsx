import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Part_WeekRowArr.scss'

type WeekRowArrPartProps = DivCommonProps & {}

export const WeekRowArrPart: FC<WeekRowArrPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`WeekRowArr_Part ${className || ''}`} style={style} {...props}>
      <div className="_arr_container_part">
        <button className="_week_row">251013</button>
        <button className="_week_row">251006</button>
        <button className="_week_row">250929</button>
        <button className="_week_row">250922</button>
        <button className="_week_row">250915</button>
        <button className="_week_row">250908</button>
        <button className="_week_row">250901</button>
        <button className="_week_row">250825</button>
        <button className="_week_row">250818</button>
        <button className="_week_row">250811</button>
        <button className="_week_row">250804</button>
      </div>
    </div>
  )
}
