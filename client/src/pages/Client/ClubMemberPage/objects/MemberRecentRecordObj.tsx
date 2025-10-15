import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberRecentRecordObject.scss'

type MemberRecentRecordObjProps = DivCommonProps & {}

export const MemberRecentRecordObj: FC<MemberRecentRecordObjProps> = ({className, style, ...props}) => {
  return (
    <div className={`MemberRecentRecord_Object ${className || ''}`} style={style} {...props}>
      <p className="_title_object">최근 기록(구현중...)</p>

      <div className="_contents_object">구현중...</div>
    </div>
  )
}
