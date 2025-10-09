import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type FooterProps = DivCommonProps & {}

export const Footer: FC<FooterProps> = ({className, style, ...props}) => {
  return (
    <div className={`Footer ${className || ''}`} style={style} {...props}>
      <p className="_title">Copyright 2025, dudgns113@gmail.com</p>
    </div>
  )
}
