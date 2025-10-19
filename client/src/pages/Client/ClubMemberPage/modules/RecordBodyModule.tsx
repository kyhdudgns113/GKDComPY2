import {useCommunityStates, useMemberStates} from '@store'

import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'

import * as V from '@value'

import '../_styles/RecordBodyModule.scss'

type RecordBodyModuleProps = TableBodyCommonProps & {}

export const RecordBodyModule: FC<RecordBodyModuleProps> = ({className, style, ...props}) => {
  const {clubArr} = useCommunityStates()
  const {memberRecentRecordArr} = useMemberStates()

  return (
    <tbody className={`RecordBody_Module ${className || ''}`} style={style} {...props}>
      {memberRecentRecordArr.map((dailyRecord, dailyRecordIdx) => {
        const club = clubArr.find(club => club.clubOId === dailyRecord.clubOId)
        const clubName = club ? club.clubName : '삭제된 클럽'

        return (
          <tr key={dailyRecordIdx}>
            <td className="_td_br_2">{dailyRecord.dateVal}</td>
            <td className="_td_br_2">{dailyRecord.condError === 0 ? '' : 'X'}</td>
            <td className="_td_br_2">{dailyRecord.result0 === 0 ? '' : V.getResultString(dailyRecord.result0)}</td>
            <td className="_td_br_2">{dailyRecord.result1 === 0 ? '' : V.getResultString(dailyRecord.result1)}</td>
            <td className="_td_br_2">{dailyRecord.result2 === 0 ? '' : V.getResultString(dailyRecord.result2)}</td>
            <td className="_td_br_2">{dailyRecord.comment ? 'V' : ''}</td>
            <td className=" ">{clubName}</td>
          </tr>
        )
      })}
    </tbody>
  )
}
