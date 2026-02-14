import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Obj_TeamScore.scss'

type TeamScoreObjectProps = DivCommonProps & {}

export const TeamScoreObject: FC<TeamScoreObjectProps> = ({className, style, ...props}) => {
  return (
    <div className={`TeamScore_Object ${className || ''}`} style={style} {...props}>
      TeamScoreObject
    </div>
  )
}
