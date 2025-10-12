import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {UserType} from '@shareType'

type UserRowObjectProps = DivCommonProps & {
  user: UserType
}

export const UserRowObject: FC<UserRowObjectProps> = ({user, className, style, ...props}) => {
  return (
    <div className={`UserRow_Object __ROW_COMMON ${className || ''}`} style={style} {...props}>
      <p className="_title_object">{user.userId}</p>
    </div>
  )
}
