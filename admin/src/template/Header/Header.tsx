import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAuthCallbacksContext} from '@context'

import {ButtonRowPart} from './parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/Header.scss'

type HeaderProps = DivCommonProps & {}

export const Header: FC<HeaderProps> = ({className, style, ...props}) => {
  const {refreshToken} = useAuthCallbacksContext()

  const navigate = useNavigate()

  const onClickTitle = useCallback(() => {
    refreshToken() // ::
      .then(res => {
        if (res) {
          navigate('/admin')
        } // ::
        else {
          navigate('/signIn')
        }
      })
      .catch(() => navigate('/signIn'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`Header ${className || ''}`} style={style} {...props}>
      <ButtonRowPart />

      <p className="_title" onClick={onClickTitle}>
        GKDComPY 관리자 사이트
      </p>
    </div>
  )
}
