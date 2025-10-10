import {useAppSelector} from '@store'
import {selectSelectedCommunity} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type InfoButtonRowObjectProps = DivCommonProps & {}

export const InfoButtonRowObject: FC<InfoButtonRowObjectProps> = ({className, style, ...props}) => {
  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  return (
    <div className={`InfoButtonRow_Object ${className || ''}`} style={style} {...props}>
      InfoButtonRow_Object {selectedCommunity.commName}
    </div>
  )
}
