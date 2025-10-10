import {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'

import {useAppSelector} from '@store'
import {selectCommunityArr, unselectCommunity} from '@store'

import {AddCommButton} from '../buttons'
import {CommAddObject, CommRowObject} from '../objects'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

type CommListPartProps = DivCommonProps & {}

export const CommListPart: FC<CommListPartProps> = ({className, style, ...props}) => {
  const dispatch = useDispatch()

  const commArr = useAppSelector(selectCommunityArr)

  const [isOpenInput, setIsOpenInput] = useState<boolean>(false)

  const onClickPart = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      dispatch(unselectCommunity())
    },
    [dispatch]
  )

  return (
    <div className={`CommList_Part ${className || ''}`} onClick={onClickPart} style={style} {...props}>
      {/* 1. 최상단: 타이틀 */}
      <p className="_title_part">공동체 목록</p>

      {/* 2. 최상단: 아이콘 (position: absolute) */}
      <AddCommButton setter={setIsOpenInput} />

      {/* 3. 새 공동체 입력창 */}
      {isOpenInput && <CommAddObject setter={setIsOpenInput} />}

      {/* 4. 공동체 리스트 */}
      {commArr.map((community, commIdx) => (
        <CommRowObject key={commIdx} community={community} />
      ))}
    </div>
  )
}
