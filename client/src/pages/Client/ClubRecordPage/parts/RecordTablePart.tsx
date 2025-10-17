import {TableBodyObject, TableHeadObject} from '../objects'

import type {FC} from 'react'
import type {TableCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Part_RecordTable.scss'

type RecordTablePartProps = TableCommonProps & {
  weekRow: WeekRowType
}

export const RecordTablePart: FC<RecordTablePartProps> = ({weekRow, className, style, ...props}) => {
  return (
    <table className={`RecordTable_Part ${className || ''}`} style={style} {...props}>
      <TableHeadObject weekRow={weekRow} />
      <TableBodyObject weekRow={weekRow} />
    </table>
  )
}
