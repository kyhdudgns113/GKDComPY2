import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import {Outlet} from 'react-router-dom'

type TemplateProps = DivCommonProps & {}

export const Template: FC<TemplateProps> = ({className, style, ...props}) => {
  return (
    <div className={`Template ${className || ''}`} style={style} {...props}>
      <h1>Template</h1>
      <Outlet />
    </div>
  )
}
