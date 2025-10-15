import {useEffect, useState} from 'react'

import {useMemberStates} from '@store'

import {CancelInfoButton, CloseInfoButton, DeleteMemberButton, MoveMemberButton, SaveInfoButton} from '../buttons'
import {MemberCommentObj, MemberMoveObj, MemberRecentRecordObj, MemberValueObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberSpecPart.scss'

type MemberSpecPartProps = DivCommonProps & {}

export const MemberSpecPart: FC<MemberSpecPartProps> = ({className, style, ...props}) => {
  const {clubMemberArr, clubMemberOpened} = useMemberStates()

  const [isMoveOpen, setIsMoveOpen] = useState<boolean>(false)
  const [memName, setMemName] = useState<string>('')

  // 초기화: memName
  useEffect(() => {
    /**
     * 이름 바꿀때 clubMemberOpened 의 이름을 실시간으로 바꾼다
     * 타이틀에 표기될 이름은 원래 멤버의 이름 그대로를 쓰려고 한다
     */
    const member = clubMemberArr.find(mem => mem.memOId === clubMemberOpened.memOId)
    setMemName(member?.memName || '<< ERROR >>')
  }, [clubMemberArr, clubMemberOpened])

  return (
    <div className={`MemberSpec_Part ${className || ''}`} style={style} {...props}>
      {/* 1. 헤더: 타이틀, 삭제, 이동, 닫기 버튼 */}
      <div className="_header_part">
        <p className="_title_part"> {memName} </p>
        <DeleteMemberButton />
        <MoveMemberButton setter={setIsMoveOpen} />
        <CloseInfoButton />
        <MemberMoveObj className={isMoveOpen ? '_visible' : ''} />
      </div>

      {/* 2. 멤버 코멘트 */}
      <MemberCommentObj />

      {/* 3. 설정창: 이름, 타자, 투수, 왕관 */}
      <MemberValueObject />

      {/* 4. 최근 기록 */}
      <MemberRecentRecordObj />

      {/* 5. 푸터: 수정, 취소 버튼 */}
      <div className="_footer_part">
        <SaveInfoButton />
        <CancelInfoButton />
      </div>
    </div>
  )
}
