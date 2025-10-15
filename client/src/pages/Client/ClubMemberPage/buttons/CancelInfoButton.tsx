import {useCallback} from 'react'

import {getMemberByMemOId, useAppDispatch, useAppSelector, useMemberActions, useMemberStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'
import type {MemberType} from '@shareType'

type CancelInfoButtonProps = ButtonCommonProps & {}

export const CancelInfoButton: FC<CancelInfoButtonProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()
  const {setClubMemberOpened} = useMemberActions()

  const member = useAppSelector(getMemberByMemOId(clubMemberOpened.memOId))
  const dispatch = useAppDispatch()

  const onClickCancel = useCallback(
    (member: MemberType) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      dispatch(setClubMemberOpened(member))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <button
      className={`CancelInfo_Button ${className || ''}`}
      onClick={onClickCancel(member)}
      style={style}
      {...props} // ::
    >
      취소
    </button>
  )
}
