import {useCallback} from 'react'

import {useMemberCallbacksContext} from '@context'
import {getMemberByMemOId, useAppDispatch, useAppSelector, useMemberActions, useMemberStates} from '@store'

import {MemberDeckPart, MemberSpecPart} from '../parts'

import type {FC, KeyboardEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {MemberType} from '@shareType'

import '../_styles/MemberInfoSubpage.scss'

type MemberInfoSubpageProps = DivCommonProps & {}

export const MemberInfoSubpage: FC<MemberInfoSubpageProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()
  const {saveClubMemberInfo} = useMemberCallbacksContext()
  const {setClubMemberOpened, unselectClubMemberOpened} = useMemberActions()

  const dispatch = useAppDispatch()

  const member = useAppSelector(getMemberByMemOId(clubMemberOpened.memOId))

  const onKeyDownSP = useCallback(
    (clubMemberOpened: MemberType, member: MemberType) => (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.stopPropagation()
        e.preventDefault()
        saveClubMemberInfo(clubMemberOpened) // ::
          .then(res => {
            if (res) {
              alert('멤버 정보 저장 성공')
            }
          })
      } // ::
      else if (e.ctrlKey && e.key === 'l') {
        e.stopPropagation()
        e.preventDefault()

        dispatch(setClubMemberOpened(member))
      } // ::
      else if (e.key === 'Escape') {
        e.stopPropagation()
        e.preventDefault()
        dispatch(unselectClubMemberOpened())
      }
    },
    [dispatch, saveClubMemberInfo] // eslint-disable-line react-hooks/exhaustive-deps
  )

  if (clubMemberOpened.memOId === '') {
    return (
      <div className={`MemberInfo_Subpage _No_Member ${className || ''}`} style={style} {...props}>
        <p>&nbsp;</p>
      </div>
    )
  }

  return (
    <div
      className={`MemberInfo_Subpage ${className || ''}`}
      onKeyDown={onKeyDownSP(clubMemberOpened, member)}
      style={style}
      tabIndex={0}
      {...props} // ::
    >
      <MemberSpecPart />
      <MemberDeckPart />
    </div>
  )
}
