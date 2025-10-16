import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/BTN_DeleteWeek.scss'

type DeleteWeekButtonProps = DivCommonProps & {}

export const DeleteWeekButton: FC<DeleteWeekButtonProps> = ({className, style, ...props}) => {
  return (
    <div className={`DeleteWeek_Button ${className || ''}`} style={style} {...props}>
      삭제
    </div>
  )
}
