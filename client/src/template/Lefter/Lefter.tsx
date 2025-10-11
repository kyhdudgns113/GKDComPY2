import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Lefter.scss'

type LefterProps = DivCommonProps & {}

export const Lefter: FC<LefterProps> = ({className, style, ...props}) => {
  return (
    <div className={`Lefter ${className || ''}`} style={style} {...props}>
      <p className="_title_lefter">Lefter</p>
    </div>
  )
}
