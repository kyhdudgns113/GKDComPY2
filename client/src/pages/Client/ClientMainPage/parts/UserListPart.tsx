import {useAuthStatesContext} from '@context'
import {useCommunityStates} from '@store'

import {AddUserButton} from '../buttons'
import {UserRowObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/UserListPart.scss'
import {AUTH_SILVER} from '@secret'

type UserListPartProps = DivCommonProps & {}

export const UserListPart: FC<UserListPartProps> = ({className, style, ...props}) => {
  const {userArr} = useCommunityStates()
  const {commAuth} = useAuthStatesContext()

  return (
    <div className={`UserList_Part ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_part">유저 목록</p>

      {/* 2. 유저 목록 */}
      <div className="_container_arr_part">
        {userArr.map((user, userIdx) => (
          <UserRowObject key={userIdx} user={user} />
        ))}
      </div>

      {/* 3. 유저 추가 버튼 */}
      {commAuth >= AUTH_SILVER && <AddUserButton />}
    </div>
  )
}
