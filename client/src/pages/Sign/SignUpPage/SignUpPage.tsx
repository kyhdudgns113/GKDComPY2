import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthCallbacksContext} from '@context'

import {InputIDPart, InputPWPart, InputPWConfirmPart} from './parts'

import type {FC, KeyboardEvent, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Sign.scss'

type SignUpPageProps = DivCommonProps & {}

export const SignUpPage: FC<SignUpPageProps> = ({className, style, ...props}) => {
  const {refreshToken} = useAuthCallbacksContext()

  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const navigate = useNavigate()

  const _executeSignUp = useCallback(
    (userId: string, password: string, passwordConfirm: string) => {
      // 비밀번호 확인 검증
      if (password !== passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }

      // 필수 입력값 검증
      if (!userId || !password) {
        alert('모든 필드를 입력해주세요.')
        return
      }

      alert(`관리자에게 문의주세요. dudgns113@gmail.com`)
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickSignUp = useCallback(
    (userId: string, password: string, passwordConfirm: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      _executeSignUp(userId, password, passwordConfirm)
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickBack = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      navigate('/signIn')
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // Enter 키 누르면 회원가입 버튼 누르는 효과
  const onKeyDownContainer = useCallback(
    (userId: string, password: string, passwordConfirm: string) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        _executeSignUp(userId, password, passwordConfirm)
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
    <div className={`SignUp_Page _page  ${className || ''}`} style={style} {...props}>
      <div
        className="_container" // ::
        onKeyDown={onKeyDownContainer(userId, password, passwordConfirm)}
        tabIndex={0}
      >
        {/* 1. 타이틀 */}
        <p className="_title">회원 가입</p>

        {/* 2. 입력: ID */}
        <InputIDPart setter={setUserId} value={userId} />

        {/* 3. 입력: PW */}
        <InputPWPart setter={setPassword} value={password} />

        {/* 4. 입력: PW 확인 */}
        <InputPWConfirmPart setter={setPasswordConfirm} value={passwordConfirm} />

        {/* 5. 버튼 행 */}
        <div className="_button_row">
          <button className="AppButton_Sakura" onClick={onClickSignUp(userId, password, passwordConfirm)}>
            회원가입
          </button>
          <button className="AppButton_Sakura" onClick={onClickBack}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  )
}
