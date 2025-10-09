import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {CommunityType} from '@shareType'

type CommRowObjectProps = DivCommonProps & {
  community: CommunityType
}

export const CommRowObject: FC<CommRowObjectProps> = ({community, className, style, ...props}) => {
  return (
    <div className={`CommRow_Object ${className || ''}`} style={style} {...props}>
      {community.commName}
    </div>
  )
}
