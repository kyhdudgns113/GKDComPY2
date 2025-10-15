import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberRecentRecordObject.scss'

type MemberRecentRecordObjProps = DivCommonProps & {}

export const MemberRecentRecordObj: FC<MemberRecentRecordObjProps> = ({className, style, ...props}) => {
  return (
    <div className={`MemberRecentRecord_Object ${className || ''}`} style={style} {...props}>
      MemberRecentRecordObject
    </div>
  )
}
