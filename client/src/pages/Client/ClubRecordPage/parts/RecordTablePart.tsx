import {useEffect, useState} from 'react'

import {useRecordStates} from '@store'

import {TableBodyObject, TableHeadObject} from '../objects'

import type {FC} from 'react'
import type {TableCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Part_RecordTable.scss'

type RecordTablePartProps = TableCommonProps & {
  weekRow: WeekRowType
}

export const RecordTablePart: FC<RecordTablePartProps> = ({weekRow, ...props}) => {
  const {showModeRecord} = useRecordStates()

  const [isShowRecord, setIsShowRecord] = useState<boolean>(false)

  useEffect(() => {
    setIsShowRecord(showModeRecord === 'record')
  }, [showModeRecord])

  return (
    <table className={`RecordTable_Part `} hidden={!isShowRecord} {...props}>
      <TableHeadObject weekRow={weekRow} />
      <TableBodyObject weekRow={weekRow} />
    </table>
  )
}
