import {useEffect, useState, useCallback} from 'react'
import {Icon} from '@component'
import {AUTH_ADMIN, AUTH_SILVER, AUTH_GOLD, AUTH_NORMAL} from '@secret'
import {useAppDispatch} from '@store'
import {openModalModifyUser, selectUser} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {UserType} from '@shareType'

type UserRowGroupProps = DivCommonProps & {
  user: UserType
}

export const UserRowGroup: FC<UserRowGroupProps> = ({user, className, style, ...props}) => {
  const [crownColor, setCrownColor] = useState<string>('_color_normal')

  const dispatch = useAppDispatch()

  const onClickUserRow = useCallback(
    (user: UserType) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      dispatch(selectUser(user))
      dispatch(openModalModifyUser())
    },
    [dispatch]
  )

  // 초기화: crownColor
  useEffect(() => {
    let newCrownColor = ''
    switch (user.commAuth) {
      case AUTH_ADMIN:
        newCrownColor = '_color_admin' // admin 유저가 공동체의 유저목록에 있으면 안되긴 한다.
        break
      case AUTH_GOLD:
        newCrownColor = '_color_gold'
        break
      case AUTH_SILVER:
        newCrownColor = '_color_silver'
        break
      default:
        newCrownColor = '_color_normal'
        break
    }
    setCrownColor(newCrownColor)
  }, [user])

  return (
    <div
      className={`UserRow_Group ${className || ''}`}
      onClick={onClickUserRow(user)}
      style={style}
      {...props} // ::
    >
      <p className="_title_group">{user.userId}</p>
      {user.commAuth !== AUTH_NORMAL && <Icon iconName="crown" className={`_crown_icon ${crownColor}`} />}
    </div>
  )
}
