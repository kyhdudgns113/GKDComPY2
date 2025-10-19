import {useEffect, useState} from 'react'

import {useMemberStates} from '@store'
import {useRecordCallbacksContext} from '@context'

import {RecordHeadModule, RecordBodyModule} from '../modules'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberRecentRecordObject.scss'

type MemberRecentRecordObjProps = DivCommonProps & {}

export const MemberRecentRecordObj: FC<MemberRecentRecordObjProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()
  const {loadMemberRecentRecord} = useRecordCallbacksContext()

  const [duration, setDuration] = useState<number>(28)

  useEffect(() => {
    loadMemberRecentRecord(clubMemberOpened.memOId, duration)
  }, [clubMemberOpened, duration, loadMemberRecentRecord])

  return (
    <div className={`MemberRecentRecord_Object ${className || ''}`} style={style} {...props}>
      <div className="_header_row_object">
        <p className="_title_object">최근 기록</p>
        <select className="_select_object" value={duration} onChange={e => setDuration(parseInt(e.target.value))}>
          <option value={28}>4주</option>
          <option value={56}>8주</option>
          <option value={112}>16주</option>
          <option value={224}>32주</option>
          <option value={365}>1년</option>
        </select>
      </div>

      <div className="_table_container_object">
        <table>
          <RecordHeadModule />
          <RecordBodyModule />
        </table>
      </div>
    </div>
  )
}
