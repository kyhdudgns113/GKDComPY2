import {useRecordStates} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Part_WeekRowArr.scss'

type WeekRowArrPartProps = DivCommonProps & {}

export const WeekRowArrPart: FC<WeekRowArrPartProps> = ({className, style, ...props}) => {
  const {weekRowArr} = useRecordStates()

  return (
    <div className={`WeekRowArr_Part ${className || ''}`} style={style} {...props}>
      <div className="_arr_container_part">
        {weekRowArr.map((weekRow, rowIdx) => (
          <button className="_week_row" key={rowIdx}>
            {weekRow.title}
          </button>
        ))}
      </div>
    </div>
  )
}
