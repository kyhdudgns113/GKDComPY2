import {useEffect} from 'react'
import {useCommunityCallbacksContext} from '@context'
import {selectCommUserArr, useAppSelector} from '@store'
import {selectSelectedCommunity} from '@store'

import {AddUserButton} from '../buttons'
import {UserRowGroup} from '../groups'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type CommUserListObjectProps = DivCommonProps & {}

export const CommUserListObject: FC<CommUserListObjectProps> = ({className, style, ...props}) => {
  const {loadCommUserArr} = useCommunityCallbacksContext()

  const commUserArr = useAppSelector(selectCommUserArr)

  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  // 초기화: 유저 목록
  useEffect(() => {
    if (!selectedCommunity.commOId) return

    loadCommUserArr(selectedCommunity.commOId)
  }, [selectedCommunity, loadCommUserArr]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`CommUserList_Object ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_object">유저 목록: {commUserArr.length}명</p>

      {/* 2. 유저 추가 버튼 */}
      <AddUserButton />

      {/* 2. 유저 목록 */}
      <div className="_user_arr_container_object">
        {commUserArr.map((user, userIdx) => (
          <UserRowGroup key={userIdx} user={user} />
        ))}
      </div>
    </div>
  )
}
