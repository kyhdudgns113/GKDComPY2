import {useEffect} from 'react'
import {useAppSelector} from '@store'
import {selectSelectedCommunity} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {CommSettingType, Setter} from '@type'

type CommSettingObjectProps = DivCommonProps & {
  setter: Setter<CommSettingType>
  val: CommSettingType
}

export const CommSettingObject: FC<CommSettingObjectProps> = ({setter, val, className, style, ...props}) => {
  const {commName, maxUsers, maxClubs} = val

  const selectedCommunity = useAppSelector(selectSelectedCommunity)

  // 초기화: 공동체 정보
  useEffect(() => {
    setter({commName: selectedCommunity.commName, maxUsers: selectedCommunity.maxUsers, maxClubs: selectedCommunity.maxClubs})
  }, [selectedCommunity]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`CommSetting_Object ${className || ''}`} style={style} {...props}>
      {/* 1. 공동체 이름 설정 행 */}
      <div className="_div_row_object">
        <p className="_title_object_row _top">이름</p>
        <input
          className="_input_object_row _top"
          onChange={e => setter({...val, commName: e.target.value})}
          value={commName} // ::
        />
      </div>

      {/* 2. 최대 유저 수 설정 행 */}
      <div className="_div_row_object">
        <p className="_title_object_row">최대 유저</p>
        <input
          className="_input_object_row"
          onChange={e => setter({...val, maxUsers: Number(e.target.value)})}
          type="number"
          value={maxUsers} // ::
        />
      </div>

      {/* 3. 최대 클럽 수 설정 행 */}
      <div className="_div_row_object">
        <p className="_title_object_row">최대 클럽</p>
        <input
          className="_input_object_row"
          onChange={e => setter({...val, maxClubs: Number(e.target.value)})}
          type="number"
          value={maxClubs} // ::
        />
      </div>
    </div>
  )
}
