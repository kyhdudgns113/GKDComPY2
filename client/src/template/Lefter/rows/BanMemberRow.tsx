import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import {useCommunityStates} from '@store'

type BanMemberRowProps = DivCommonProps & {}

export const BanMemberRow: FC<BanMemberRowProps> = ({className, style, ...props}) => {
  const {community} = useCommunityStates()
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      navigate(`/client/club/member/${community.banClubOId}`)
    },
    [community] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`BanMember_Row _row ${className || ''}`} onClick={onClickRow} style={style} {...props}>
      <p className="_title_row">탈퇴</p>
    </div>
  )
}
