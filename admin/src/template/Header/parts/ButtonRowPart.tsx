import {SignOutButton} from '../buttons'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ButtonRowPartProps = DivCommonProps & {}

export const ButtonRowPart: FC<ButtonRowPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`ButtonRow_Part ${className || ''}`} style={style} {...props}>
      <SignOutButton />
    </div>
  )
}
