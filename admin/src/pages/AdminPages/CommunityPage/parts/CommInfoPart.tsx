import {useState} from 'react'
import {useAppSelector} from '@store'
import {selectSelectedCommunity} from '@store'

import {CommSettingObject, CommUserListObject, InfoButtonRowObject, CommClubListObject} from '../objects'

import * as T from '@type'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/CommInfoPart.scss'

type CommInfoPartProps = DivCommonProps & {}

export const CommInfoPart: FC<CommInfoPartProps> = ({className, style, ...props}) => {
  const [commSetting, setCommSetting] = useState<T.CommSettingType>({commName: '', maxUsers: 0, maxClubs: 0})

  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  if (!selectedCommunity.commName)
    return (
      <div className={`CommInfo_Part ${className || ''}`} style={style} {...props}>
        {/* 1. (에러) 타이틀 */}
        <p className="_title_part">공동체 정보 로딩에 에러가 발생했습니다.</p>
      </div>
    )

  return (
    <div className={`CommInfo_Part ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_part">공동체 [{selectedCommunity.commName}] 정보</p>

      <div className="_info_block_part">
        {/* 2. 공동체 설정값 */}
        <CommSettingObject setter={setCommSetting} val={commSetting} />

        {/* 3. 유저 목록 */}
        <CommUserListObject />

        {/* 4. 클럽 목록 */}
        <CommClubListObject />
      </div>

      {/* 5. 버튼행: 저장, 취소 */}
      <InfoButtonRowObject />
    </div>
  )
}
