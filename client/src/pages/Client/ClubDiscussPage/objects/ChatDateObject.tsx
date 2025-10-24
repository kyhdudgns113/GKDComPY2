import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/ChatDateObject.scss'

type ChatDateObjectProps = DivCommonProps & {date: Date}

export const ChatDateObject: FC<ChatDateObjectProps> = ({date, className, style, ...props}) => {
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const yoilArr = ['일', '월', '화', '수', '목', '금', '토']

  const dateString = `${Y}.${M}.${D} ${yoilArr[date.getDay()]}요일`

  return (
    <div className={`ChatDate_Object ${className || ''}`} style={style} {...props}>
      <p className="_date_string">{dateString}</p>
    </div>
  )
}
