import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAuthCallbacksContext} from '@context'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type RootPageProps = DivCommonProps & {}

export const RootPage: FC<RootPageProps> = ({className, style, ...props}) => {
  const {refreshToken} = useAuthCallbacksContext()

  const navigate = useNavigate()

  // 토큰 확인후 로그인 상태일때랑 아닐때랑 구분
  useEffect(() => {
    refreshToken()
      .then(res => {
        if (res) {
          navigate('/client')
        } // ::
        else {
          navigate('/signIn')
        }
      })
      .catch(() => navigate('/signIn'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`Root_Page ${className || ''}`} style={style} {...props}>
      <p>페이지 로딩중이에요...</p>
    </div>
  )
}
