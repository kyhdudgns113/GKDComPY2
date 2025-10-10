import {useEffect, useState} from 'react'
import {useCommunityCallbacksContext} from '@context'
import {useAppSelector} from '@store'
import {selectSelectedCommunity} from '@store'

import {AddUserButton} from '../buttons'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {UserType} from '@shareType'

type CommUserListObjectProps = DivCommonProps & {}

export const CommUserListObject: FC<CommUserListObjectProps> = ({className, style, ...props}) => {
  const {loadCommUserArr} = useCommunityCallbacksContext()

  const [userArr, setUserArr] = useState<UserType[]>([])

  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  // 초기화: 유저 목록
  useEffect(() => {
    if (!selectedCommunity.commOId) return

    loadCommUserArr(selectedCommunity.commOId, setUserArr)
  }, [selectedCommunity]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`CommUserList_Object ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_object">유저 목록: {userArr.length}명</p>

      {/* 2. 유저 추가 버튼 */}
      <AddUserButton />

      {/* 2. 유저 목록 */}
      <div className="_user_arr_container_object">
        {userArr.map((user, userIdx) => (
          <div key={userIdx}>{user.userId}</div>
        ))}
      </div>
    </div>
  )
}
