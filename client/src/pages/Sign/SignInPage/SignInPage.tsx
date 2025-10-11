import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthCallbacksContext} from '@context'

import {InputIDPart, InputPWPart} from './parts'

import type {FC, KeyboardEvent, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Sign.scss'

type SignInPageProps = DivCommonProps & {}

export const SignInPage: FC<SignInPageProps> = ({className, style, ...props}) => {
  const {refreshToken, signIn} = useAuthCallbacksContext()

  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const _executeSignIn = useCallback(
    (userId: string, password: string) => {
      if (!userId || !password) {
        alert('모든 필드를 입력해주세요.')
        return
      }

      signIn(userId, password).then(res => {
        if (res) {
          navigate('/')
        }
      })
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickSignIn = useCallback(
    (userId: string, password: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeSignIn(userId, password)
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickSignUp = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      navigate('/signUp')
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onKeyDownContainer = useCallback(
    (userId: string, password: string) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        _executeSignIn(userId, password)
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // 토큰 갱신하여 로그인상태 확인후, 로그인중이면 admin 으로 이동
  useEffect(() => {
    refreshToken()
      .then(res => {
        if (res) {
          navigate('/client')
        }
      })
      .catch(() => navigate('/signIn'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`SignIn_Page _page  ${className || ''}`} style={style} {...props}>
      <div
        className="_container" // ::
        onKeyDown={onKeyDownContainer(userId, password)}
        tabIndex={0}
      >
        {/* 1. 타이틀 */}
        <p className="_title">관리자 페이지</p>

        {/* 2. 입력: ID */}
        <InputIDPart setter={setUserId} value={userId} />

        {/* 3. 입력: PW */}
        <InputPWPart setter={setPassword} value={password} />

        {/* 4. 버튼 행 */}
        <div className="_button_row">
          <button className="AppButton_Sakura" onClick={onClickSignIn(userId, password)}>
            로그인
          </button>
          <button className="AppButton_Sakura" onClick={onClickSignUp}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}
