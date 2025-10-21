import {useRecordStates} from '@store'

import {CommentRowGroup, MemberRowGroup, StatisticRowGroup} from '../groups'

import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Obj_TableBody.scss'

type TableBodyObjectProps = TableBodyCommonProps & {
  weekRow: WeekRowType
}

export const TableBodyObject: FC<TableBodyObjectProps> = ({weekRow, className, style, ...props}) => {
  const {rowMemberArr} = useRecordStates()

  const arrLen = rowMemberArr.length

  return (
    <tbody className={`TableBody_Object ${className || ''}`} style={style} {...props}>
      {/* 1. 멤버 기록 행 목록 */}
      {rowMemberArr.map((rowMember, rowIdx) => (
        <MemberRowGroup key={rowIdx} arrLen={arrLen} idx={rowIdx} rowMember={rowMember} weekRow={weekRow} />
      ))}

      {/* 2. 통계 행 */}
      <StatisticRowGroup weekRow={weekRow} />

      {/* 3. 코멘트, 멤버 추가 행 */}
      <CommentRowGroup weekRow={weekRow} />
    </tbody>
  )
}
