import {useCallback} from 'react'
import {useAppDispatch, useMemberActions, useMemberStates} from '@store'

import type {ChangeEvent, FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {MemberType} from '@shareType'

import '../_styles/MemberCommentObj.scss'

type MemberCommentObjProps = DivCommonProps & {}

export const MemberCommentObj: FC<MemberCommentObjProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()
  const {setClubMemberOpened} = useMemberActions()

  const dispatch = useAppDispatch()

  const onChangeComment = useCallback(
    (member: MemberType) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newMember = {...member, memberComment: e.currentTarget.value}
      dispatch(setClubMemberOpened(newMember))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`MemberComment_Object ${className || ''}`} style={style} {...props}>
      <textarea
        autoFocus
        className="_textarea_part"
        maxLength={100}
        onChange={onChangeComment(clubMemberOpened)}
        placeholder="코멘트를 입력해주세요."
        value={clubMemberOpened.memberComment}
      />
    </div>
  )
}
