import {Outlet} from 'react-router-dom'

import {Header} from './Header'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/Template.scss'

type TemplateProps = DivCommonProps & {}

export const Template: FC<TemplateProps> = ({className, style, ...props}) => {
  return (
    <div className={`Template ${className}`} style={style} {...props}>
      <Header />
      <Outlet />
    </div>
  )
}
