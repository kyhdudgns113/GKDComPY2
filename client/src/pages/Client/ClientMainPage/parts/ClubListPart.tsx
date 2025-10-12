import {useCommunityStates} from '@store'

import {ClubRowObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ClubListPartProps = DivCommonProps & {}

export const ClubListPart: FC<ClubListPartProps> = ({className, style, ...props}) => {
  const {clubArr} = useCommunityStates()

  return (
    <div className={`ClubList_Part ${className || ''}`} style={style} {...props}>
      <p className="_title_part">클럽 목록</p>

      <div className="_container_arr_part">
        {clubArr.map((club, clubIdx) => (
          <ClubRowObject key={clubIdx} club={club} />
        ))}
      </div>
    </div>
  )
}
