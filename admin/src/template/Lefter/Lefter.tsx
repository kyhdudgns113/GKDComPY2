import {useAppSelector} from '@store'
import {selectLefterIsOpen} from '@store'

import {CommunityRowPart, LogRowPart} from './parts'
import {LefterToggleButton} from './buttons'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/Lefter.scss'

type LefterProps = DivCommonProps & {}

export const Lefter: FC<LefterProps> = ({className, style, ...props}) => {
  const isOpen = useAppSelector(selectLefterIsOpen)

  return (
    <div className={`Lefter ${className || ''}`} style={style} {...props}>
      <div className={`_lefter_container ${isOpen ? '_open' : '_close'}`}>
        <CommunityRowPart />
        <LogRowPart />
      </div>
      <LefterToggleButton />
    </div>
  )
}
