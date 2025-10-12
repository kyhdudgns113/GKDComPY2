import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {Icon} from '@component'
import {useAuthCallbacksContext} from '@context'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Header.scss'

type HeaderProps = DivCommonProps & {}

export const Header: FC<HeaderProps> = ({className, style, ...props}) => {
  const {signOut} = useAuthCallbacksContext()

  const navigate = useNavigate()

  const onClickLogout = useCallback(() => {
    signOut()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onClickTitle = useCallback(() => {
    navigate('/')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`Header ${className || ''}`} style={style} {...props}>
      {/* 1. 로그아웃 버튼 */}
      <Icon iconName="logout" className="_logout_button" onClick={onClickLogout} />

      {/* 2. 타이틀 */}
      <p className="_title_header" onClick={onClickTitle}>
        컴프야 클럽 매니저
      </p>
    </div>
  )
}
