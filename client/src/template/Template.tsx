import {useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'

import {useAuthCallbacksContext} from '@context'

import {Footer} from './Footer'
import {Header} from './Header'
import {Lefter} from './Lefter'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/Template.scss'

type TemplateProps = DivCommonProps & {}

export const Template: FC<TemplateProps> = ({className, style, ...props}) => {
  const {refreshToken} = useAuthCallbacksContext()

  const navigate = useNavigate()

  // RefreshToken 실패하면 루트 페이지를 통해 로그인 페이지로 이동
  useEffect(() => {
    refreshToken() // ::
      .then(res => {
        if (!res) {
          navigate('/')
        }
      })
      .catch(() => navigate('/'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
