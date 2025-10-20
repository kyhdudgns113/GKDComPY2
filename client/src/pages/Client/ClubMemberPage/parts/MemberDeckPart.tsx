import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberDeckPart.scss'
import {Card} from '../components'

type MemberDeckPartProps = DivCommonProps & {}

export const MemberDeckPart: FC<MemberDeckPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`MemberDeck_Part ${className || ''}`} style={style} {...props}>
      <p className="_title_part">멤버 덱</p>

      <Card />
    </div>
  )
}
