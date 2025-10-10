import {useAppSelector} from '@store'
import {selectSelectedCommunity} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type CommClubListObjectProps = DivCommonProps & {}

export const CommClubListObject: FC<CommClubListObjectProps> = ({className, style, ...props}) => {
  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  return (
    <div className={`CommClubList_Object ${className || ''}`} style={style} {...props}>
      CommClubList_Object {selectedCommunity.commName}
    </div>
  )
}
