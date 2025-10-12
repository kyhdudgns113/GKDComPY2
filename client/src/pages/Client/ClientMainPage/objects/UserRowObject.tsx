import {useCallback} from 'react'
import {useAuthStatesContext} from '@context'
import {AUTH_GOLD} from '@secret'
import {useAppDispatch, useModalActions} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {UserType} from '@shareType'

type UserRowObjectProps = DivCommonProps & {
  user: UserType
}

export const UserRowObject: FC<UserRowObjectProps> = ({user, className, style, ...props}) => {
  const dispatch = useAppDispatch()
  const {selectModifyUser, openModalModifyUser} = useModalActions()
  const {commAuth, userOId} = useAuthStatesContext()

  const onClickUserRow = useCallback(
    (commAuth: number, userOId: string, user: UserType) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (commAuth < AUTH_GOLD && userOId !== user.userOId) {
        alert(`${user.userId} 님은 고생하시는 운영진입니다.`)
        return
      }

      dispatch(selectModifyUser(user))
      dispatch(openModalModifyUser())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div
      className={`UserRow_Object __ROW_COMMON ${className || ''}`}
      onClick={onClickUserRow(commAuth, userOId, user)}
      style={style}
      {...props} // ::
    >
      <p className="_title_object">{user.userId}</p>
    </div>
  )
}
