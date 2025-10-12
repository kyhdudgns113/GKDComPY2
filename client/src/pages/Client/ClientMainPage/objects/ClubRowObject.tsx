import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowObjectProps = DivCommonProps & {
  club: ClubType
}

export const ClubRowObject: FC<ClubRowObjectProps> = ({club, className, style, ...props}) => {
  return (
    <div className={`ClubRow_Object ${className || ''}`} style={style} {...props}>
      <p className="_title_object">{club.clubName}</p>
    </div>
  )
}
