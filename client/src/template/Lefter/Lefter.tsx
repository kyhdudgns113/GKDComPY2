import {useCommunityStates, useTemplateStates} from '@store'
import {LefterToggleButton} from './buttons'
import {MainPageRow, EntireMemberRow, ClubRow} from './rows'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Lefter.scss'

type LefterProps = DivCommonProps & {}

export const Lefter: FC<LefterProps> = ({className, style, ...props}) => {
  const {clubArr} = useCommunityStates()
  const {isLefterOpen} = useTemplateStates()

  return (
    <div className={`Lefter ${className || ''}`} style={style} {...props}>
      {/* 1. 컨테이너 */}
      <div className={`_container_lefter ${isLefterOpen ? '_open' : '_close'}`}>
        <MainPageRow />
        <EntireMemberRow />
        {clubArr.map((club, clubIdx) => (
          <ClubRow key={clubIdx} club={club} />
        ))}
      </div>

      {/* 2. 토글 버튼 */}
      <LefterToggleButton />
    </div>
  )
}
