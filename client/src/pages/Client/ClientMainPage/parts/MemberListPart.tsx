import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type MemberListPartProps = DivCommonProps & {}

export const MemberListPart: FC<MemberListPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`MemberList_Part ${className || ''}`} style={style} {...props}>
      <p className="_title_part">멤버 목록</p>
    </div>
  )
}
