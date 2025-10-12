import {useAppSelector} from '@store'
import {selectIsLefterOpen} from '@store'

import {LefterToggleButton} from './buttons'
import {MainPageRow, EntireMemberRow} from './rows'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Lefter.scss'

type LefterProps = DivCommonProps & {}

export const Lefter: FC<LefterProps> = ({className, style, ...props}) => {
  const isOpen = useAppSelector(selectIsLefterOpen)

  return (
    <div className={`Lefter ${className || ''}`} style={style} {...props}>
      {/* 1. 컨테이너 */}
      <div className={`_container_lefter ${isOpen ? '_open' : '_close'}`}>
        <MainPageRow />
        <EntireMemberRow />
      </div>

      {/* 2. 토글 버튼 */}
      <LefterToggleButton />
    </div>
  )
}
