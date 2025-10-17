import {useRecordStates} from '@store'

import {MemberRowGroup} from '../groups'

import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'

import '../_styles/Obj_TableBody.scss'

type TableBodyObjectProps = TableBodyCommonProps & {}

export const TableBodyObject: FC<TableBodyObjectProps> = ({className, style, ...props}) => {
  const {rowMemberArr} = useRecordStates()

  return (
    <tbody className={`TableBody_Object ${className || ''}`} style={style} {...props}>
      {/* 1. 멤버 기록 행 목록 */}
      {rowMemberArr.map((rowMember, rowIdx) => (
        <MemberRowGroup rowMember={rowMember} key={rowIdx} />
      ))}

      {/* 2. 통계 행 */}

      {/* 3. 코멘트 행 */}
    </tbody>
  )
}
