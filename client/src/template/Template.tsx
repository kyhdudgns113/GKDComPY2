import {Outlet} from 'react-router-dom'

import {Footer} from './Footer'
import {Header} from './Header'
import {Lefter} from './Lefter'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/Template.scss'

type TemplateProps = DivCommonProps & {}

export const Template: FC<TemplateProps> = ({className, style, ...props}) => {
  return (
    <div className={`Template ${className || ''}`} style={style} {...props}>
      {/* 1. 템플릿 헤더 */}
      <Header />

      {/* 2. 템플릿 몸통 */}
      <div className="Body">
        <Lefter />
        <Outlet />
      </div>

      {/* 3. 템플릿 푸터 */}
      <Footer />
    </div>
  )
}
