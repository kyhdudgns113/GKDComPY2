import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type CommunityPageProps = DivCommonProps & {}

export const CommunityPage: FC<CommunityPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`Community_Page _page ${className || ''}`} style={style} {...props}>
      <p>Community Page</p>
    </div>
  )
}
