import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ClubMemberPageProps = DivCommonProps & {}

export const ClubMemberPage: FC<ClubMemberPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClubMember_Page CliengPages ${className || ''}`} style={style} {...props}>
      <p>클럽 멤버 페이지</p>
    </div>
  )
}
