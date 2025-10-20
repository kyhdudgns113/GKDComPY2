import {useMemberStates} from '@store'

import {Card} from '../components'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberDeckPart.scss'

type MemberDeckPartProps = DivCommonProps & {}

export const MemberDeckPart: FC<MemberDeckPartProps> = ({className, style, ...props}) => {
  const {memberDeck} = useMemberStates()

  return (
    <div className={`MemberDeck_Part ${className || ''}`} style={style} {...props}>
      {/* 0행: 선발 투수 */}
      <div className={`_deck_row _deck_sp`}>
        <Card card={memberDeck[0]} />
        <Card card={memberDeck[1]} />
        <Card card={memberDeck[2]} />
        <Card card={memberDeck[3]} />
        <Card card={memberDeck[4]} />
      </div>

      {/* 1행: 불펜 투수 */}
      <div className={`_deck_row _deck_rp`}>
        <Card card={memberDeck[5]} />
        <Card card={memberDeck[6]} />
        <Card card={memberDeck[7]} />
        <Card card={memberDeck[8]} />
        <Card card={memberDeck[9]} />

        <Card card={memberDeck[10]} className="_card_cp" />
      </div>

      {/* 2행: 타자 */}
      <div className={`_deck_row _deck_batter`}>
        <Card card={memberDeck[12]} />
        <Card card={memberDeck[13]} />
        <Card card={memberDeck[14]} />
        <Card card={memberDeck[15]} />
        <Card card={memberDeck[16]} />
      </div>

      {/* 3행: 내야수 */}
      <div className={`_deck_row _deck_infield`}>
        <Card card={memberDeck[17]} />
        <Card card={memberDeck[18]} />
        <Card card={memberDeck[19]} />
        <Card card={memberDeck[11]} />
      </div>

      {/* 4행: 외야수 */}
      <div className={`_deck_row _deck_outfield`}>
        <Card card={memberDeck[20]} />
        <Card card={memberDeck[21]} />
        <Card card={memberDeck[22]} />
        <Card card={memberDeck[23]} />
        <Card card={memberDeck[24]} />
      </div>
    </div>
  )
}
