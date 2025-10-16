import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import '../_styles/BTN_AddWeeks.scss'

type AddPrevWeekButtonProps = ButtonCommonProps & {}

export const AddPrevWeekButton: FC<AddPrevWeekButtonProps> = ({className, style, ...props}) => {
  return (
    <button className={`AddPrevWeek_Button AddWeek_Button ${className || ''}`} style={style} {...props}>
      이전 추가
    </button>
  )
}
