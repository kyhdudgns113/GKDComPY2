import {useCallback, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthCallbacksContext} from '@context'

import {InputIDPart, InputPWPart, InputPWConfirmPart} from './parts'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Sign.scss'

type SignUpPageProps = DivCommonProps & {}

export const SignUpPage: FC<SignUpPageProps> = ({className, style, ...props}) => {
  const {signUp} = useAuthCallbacksContext()

  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const navigate = useNavigate()

  const onClickSignUp = useCallback(
    (userId: string, password: string, passwordConfirm: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

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

      signUp(userId, password).then(res => {
        if (res) {
          navigate('/')
        }
      })
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

  return (
    <div className={`SignUp_Page _page  ${className || ''}`} style={style} tabIndex={0} {...props}>
      <div className="_container">
        {/* 1. 타이틀 */}
        <p className="_title">관리자 생성</p>

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
