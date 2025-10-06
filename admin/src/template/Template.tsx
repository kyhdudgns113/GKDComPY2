import {Outlet} from 'react-router-dom'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type TemplateProps = DivCommonProps & {}

export const Template: FC<TemplateProps> = ({className, style, ...props}) => {
  return (
    <div className={`Template ${className}`} style={style} {...props}>
      <Outlet />
    </div>
  )
}
