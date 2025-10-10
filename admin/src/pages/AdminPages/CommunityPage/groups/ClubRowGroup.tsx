import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as ST from '@shareType'

type ClubRowGroupProps = DivCommonProps & {
  club: ST.ClubType
}

export const ClubRowGroup: FC<ClubRowGroupProps> = ({club, className, style, ...props}) => {
  return (
    <div className={`ClubRow_Group ${className || ''}`} style={style} {...props}>
      <p className="_title_group">{club.clubName}</p>
    </div>
  )
}
