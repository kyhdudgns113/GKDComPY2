import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import {useCommunityStates} from '@store'

type SubMemberRowProps = DivCommonProps & {}

export const SubMemberRow: FC<SubMemberRowProps> = ({className, style, ...props}) => {
  const {community} = useCommunityStates()
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      navigate(`/client/club/member/${community.subClubOId}`)
    },
    [community] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`SubMember_Row _row ${className || ''}`} onClick={onClickRow} style={style} {...props}>
      <p className="_title_row">후보군</p>
    </div>
  )
}
