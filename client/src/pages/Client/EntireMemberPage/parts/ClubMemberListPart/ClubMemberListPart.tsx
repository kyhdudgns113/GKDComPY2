import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ClubMemberListPartProps = DivCommonProps & {}

export const ClubMemberListPart: FC<ClubMemberListPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClubMemberList_Part ${className || ''}`} style={style} {...props}>
      <p className="_title_part">클럽 멤버 목록</p>
    </div>
  )
}
