import {TableBodyObject, TableHeadObject} from '../objects'

import type {FC} from 'react'
import type {TableCommonProps} from '@prop'

import '../_styles/Part_RecordTable.scss'

type RecordTablePartProps = TableCommonProps & {}

export const RecordTablePart: FC<RecordTablePartProps> = ({className, style, ...props}) => {
  return (
    <table className={`RecordTable_Part ${className || ''}`} style={style} {...props}>
      <TableHeadObject />
      <TableBodyObject />
    </table>
  )
}
