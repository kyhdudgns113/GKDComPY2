import {useCallback} from 'react'
import {MEMBER_NAME_LENGTH_MAX} from '@shareValue'
import {useMemberStates, useMemberActions, useAppDispatch} from '@store'

import type {ChangeEvent, FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {MemberType} from '@shareType'

import '../_styles/MemberInputModule.scss'

type MemberInputModuleProps = DivCommonProps & {}

export const MemberInputModule: FC<MemberInputModuleProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()
  const {setClubMemberOpened} = useMemberActions()

  const dispatch = useAppDispatch()

  const onChangeMemName = useCallback(
    (member: MemberType) => (e: ChangeEvent<HTMLInputElement>) => {
      const newName = e.currentTarget.value

      if (newName.length > MEMBER_NAME_LENGTH_MAX) {
        alert('이름은 10자 이하로 입력해주세요.')
        return
      }

      const newMember = {...member, memName: e.currentTarget.value}
      dispatch(setClubMemberOpened(newMember))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onChangeBatterPower = useCallback(
    (member: MemberType) => (e: ChangeEvent<HTMLInputElement>) => {
      const newPower = Number(e.currentTarget.value)
      dispatch(setClubMemberOpened({...member, batterPower: newPower}))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onChangePitcherPower = useCallback(
    (member: MemberType) => (e: ChangeEvent<HTMLInputElement>) => {
      const newPower = Number(e.currentTarget.value)
      dispatch(setClubMemberOpened({...member, pitcherPower: newPower}))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`MemberInput_Module ${className || ''}`} style={style} {...props}>
      {/* 1. 입력: 이름 */}
      <div className="_row_module _border_bottom">
        <div>이름</div>
        <input type="text" value={clubMemberOpened.memName} onChange={onChangeMemName(clubMemberOpened)} />
      </div>

      {/* 2. 입력: 타자 */}
      <div className="_row_module _border_bottom">
        <div>타자</div>
        <input type="number" value={clubMemberOpened.batterPower} onChange={onChangeBatterPower(clubMemberOpened)} />
      </div>

      {/* 3. 입력: 투수 */}
      <div className="_row_module">
        <div>투수</div>
        <input type="number" value={clubMemberOpened.pitcherPower} onChange={onChangePitcherPower(clubMemberOpened)} />
      </div>
    </div>
  )
}
