import {MemberCrownModule, MemberInputModule} from '../modules'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberValueObject.scss'

type MemberValueObjectProps = DivCommonProps & {}

export const MemberValueObject: FC<MemberValueObjectProps> = ({className, style, ...props}) => {
  return (
    <div className={`MemberValue_Object ${className || ''}`} style={style} {...props}>
      <MemberInputModule />
      <MemberCrownModule />
    </div>
  )
}
