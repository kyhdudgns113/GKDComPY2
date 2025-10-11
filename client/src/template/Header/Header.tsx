import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Header.scss'

type HeaderProps = DivCommonProps & {}

export const Header: FC<HeaderProps> = ({className, style, ...props}) => {
  return (
    <div className={`Header ${className || ''}`} style={style} {...props}>
      <p className="_title_header">Header</p>
    </div>
  )
}
