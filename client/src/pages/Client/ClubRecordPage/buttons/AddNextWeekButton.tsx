import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import '../_styles/BTN_AddWeeks.scss'

type AddNextWeekButtonProps = ButtonCommonProps & {}

export const AddNextWeekButton: FC<AddNextWeekButtonProps> = ({className, style, ...props}) => {
  return (
    <button className={`AddNextWeek_Button AddWeek_Button ${className || ''}`} style={style} {...props}>
      다음 추가
    </button>
  )
}
