import {useCallback, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {InputIDPart, InputPWPart} from './parts'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Sign.scss'

type SignInPageProps = DivCommonProps & {}

export const SignInPage: FC<SignInPageProps> = ({className, style, ...props}) => {
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate()

  const onClickSignIn = useCallback(
    (userId: string, password: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      console.log(userId, password)
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

  return (
    <div className={`SignIn_Page _page  ${className || ''}`} style={style} tabIndex={0} {...props}>
      <div className="_container">
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
