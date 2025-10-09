import {useState} from 'react'
import {Icon} from '@component'

import {useAppSelector} from '@store'
import {selectCommunityArr} from '@store'

import {CommAddObject, CommRowObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type CommListPartProps = DivCommonProps & {}

export const CommListPart: FC<CommListPartProps> = ({className, style, ...props}) => {
  const commArr = useAppSelector(selectCommunityArr)

  const [isOpenInput, setIsOpenInput] = useState<boolean>(false)

  return (
    <div className={`CommList_Part ${className || ''}`} style={style} {...props}>
      {/* 1. 최상단: 타이틀 */}
      <p className="_title_part">공동체 목록</p>

      {/* 2. 최상단: 아이콘 (position: absolute) */}
      <Icon iconName="add" className="_icon_add_part" onClick={() => setIsOpenInput(prev => !prev)} />

      {/* 3. 새 공동체 입력창 */}
      {isOpenInput && <CommAddObject setter={setIsOpenInput} />}

      {/* 4. 공동체 리스트 */}
      {commArr.map((community, commIdx) => (
        <CommRowObject key={commIdx} community={community} />
      ))}
    </div>
  )
}
