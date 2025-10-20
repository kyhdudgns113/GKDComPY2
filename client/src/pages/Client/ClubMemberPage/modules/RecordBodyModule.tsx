import {useCallback, useState} from 'react'

import {useCommunityStates, useMemberStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {TableBodyCommonProps} from '@prop'

import * as V from '@value'

import '../_styles/RecordBodyModule.scss'

type RecordBodyModuleProps = TableBodyCommonProps & {}

export const RecordBodyModule: FC<RecordBodyModuleProps> = ({className, style, ...props}) => {
  const {clubArr} = useCommunityStates()
  const {memberRecentRecordArr} = useMemberStates()

  const [openRowIdx, setOpenRowIdx] = useState<number | null>(null)

  const onClickV = useCallback(
    (dailyRecordIdx: number, isComment: boolean) => (e: MouseEvent<HTMLTableCellElement>) => {
      if (!isComment) {
        return
      }

      e.stopPropagation()
      setOpenRowIdx(prev => {
        if (prev === dailyRecordIdx) {
          return null
        }
        return dailyRecordIdx
      })
    },
    []
  )

  return (
    <tbody className={`RecordBody_Module ${className || ''}`} style={style} {...props}>
      {memberRecentRecordArr.map((dailyRecord, dailyRecordIdx) => {
        const club = clubArr.find(club => club.clubOId === dailyRecord.clubOId)
        const clubName = club ? club.clubName : '삭제된 클럽'
        const isComment = Boolean(dailyRecord.comment && dailyRecord.comment.trim() !== '')
        const isShowCmt = isComment && openRowIdx === dailyRecordIdx

        return (
          <tr className={`_tr_body_module ${isShowCmt ? '_show_comment_row' : ''}`} key={dailyRecordIdx}>
            <td className="_td_br_2">{dailyRecord.dateVal}</td>
            <td className="_td_br_2">{dailyRecord.condError === 0 ? '' : 'X'}</td>
            <td className="_td_br_2">{dailyRecord.result0 === 0 ? '' : V.getResultString(dailyRecord.result0)}</td>
            <td className="_td_br_2">{dailyRecord.result1 === 0 ? '' : V.getResultString(dailyRecord.result1)}</td>
            <td className="_td_br_2">{dailyRecord.result2 === 0 ? '' : V.getResultString(dailyRecord.result2)}</td>
            <td className={`_td_br_2 ${isComment ? '_cursor_pointer' : ''}`} onClick={onClickV(dailyRecordIdx, isComment)}>
              {isComment ? 'V' : ''}
            </td>
            <td className="">{clubName}</td>
            {isShowCmt && (
              <div className="_floatter_comment" onClick={e => e.stopPropagation()}>
                <p>{dailyRecord.comment}</p>
              </div>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}
