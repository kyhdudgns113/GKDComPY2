import {useCallback} from 'react'
import {Icon} from '@component'
import {useAuthCallbacksContext} from '@context'

import type {FC, MouseEvent} from 'react'
import type {SpanCommonProps} from '@prop'

type SignOutButtonProps = SpanCommonProps & {}

export const SignOutButton: FC<SignOutButtonProps> = ({className, style, ...props}) => {
  const {signOut} = useAuthCallbacksContext()

  const onClickSignOut = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    e.stopPropagation()

    signOut()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Icon
      iconName="logout"
      className={`SignOut_Button _button ${className}`}
      onClick={onClickSignOut}
      style={style}
      {...props} // ::
    />
  )
}
