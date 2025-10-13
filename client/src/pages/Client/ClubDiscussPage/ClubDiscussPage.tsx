import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ClubDiscussPageProps = DivCommonProps & {}

export const ClubDiscussPage: FC<ClubDiscussPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClubDiscuss_Page ${className || ''}`} style={style} {...props}>
      <p>클럽 회의록 페이지</p>
    </div>
  )
}
