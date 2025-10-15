import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberInfoSubpage.scss'

type MemberInfoSubpageProps = DivCommonProps & {}

export const MemberInfoSubpage: FC<MemberInfoSubpageProps> = ({className, style, ...props}) => {
  return (
    <div className={`MemberInfo_Subpage ${className || ''}`} style={style} {...props}>
      <p>멤버 정보 서브 페이지</p>
    </div>
  )
}
