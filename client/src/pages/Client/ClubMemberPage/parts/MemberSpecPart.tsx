import {useEffect, useState} from 'react'

import {Icon} from '@component'
import {useMemberStates} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberSpecPart.scss'

type MemberSpecPartProps = DivCommonProps & {}

export const MemberSpecPart: FC<MemberSpecPartProps> = ({className, style, ...props}) => {
  const {clubMemberArr, clubMemberOpened} = useMemberStates()

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
      {/* 1. 헤더: 타이틀, 버튼들 */}
      <div className="_header_part">
        {/* 1-1. 타이틀 */}
        <p className="_title_part"> {memName} </p>

        {/* 1-2. 삭제 버튼 */}
        <Icon iconName="cancel" />

        {/* 1-3. 멤버 이동 버튼 */}
        <Icon iconName="delivery_truck_speed" />

        {/* 1-4. 닫기 버튼 */}
        <div className="_close_button">닫기</div>
      </div>

      {/* 2, 바디: 스펙 입력, 저장 및 취소버튼 */}

      {/*  */}
    </div>
  )
}
