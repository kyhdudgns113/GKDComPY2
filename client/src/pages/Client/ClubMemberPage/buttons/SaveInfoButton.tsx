import {useCallback} from 'react'
import {useMemberCallbacksContext} from '@context'
import {useMemberStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'
import type {MemberType} from '@shareType'

type SaveInfoButtonProps = ButtonCommonProps & {}

export const SaveInfoButton: FC<SaveInfoButtonProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()
  const {saveClubMemberInfo} = useMemberCallbacksContext()

  const onClickSave = useCallback(
    (member: MemberType) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      saveClubMemberInfo(member)
    },
    [saveClubMemberInfo]
  )

  return (
    <button
      className={`SaveInfo_Button ${className || ''}`}
      onClick={onClickSave(clubMemberOpened)}
      style={style}
      {...props} // ::
    >
      저장
    </button>
  )
}
