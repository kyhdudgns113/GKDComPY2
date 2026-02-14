import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Obj_TeamMatch.scss'

type TeamMatchObjectProps = DivCommonProps & {}

export const TeamMatchObject: FC<TeamMatchObjectProps> = ({className, style, ...props}) => {
  return (
    <div className={`TeamMatch_Object ${className || ''}`} style={style} {...props}>
      TeamMatchObject
    </div>
  )
}
