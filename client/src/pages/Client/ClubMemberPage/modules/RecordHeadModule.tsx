import type {FC} from 'react'
import type {TableHeadCommonProps} from '@prop'

import '../_styles/RecordHeadModule.scss'

type RecordHeadModuleProps = TableHeadCommonProps & {}

export const RecordHeadModule: FC<RecordHeadModuleProps> = ({className, style, ...props}) => {
  return (
    <thead className={`RecordHead_Module ${className || ''}`} style={style} {...props}>
      <tr>
        <th className="_th_date _br_2">날짜</th>
        <th className="_th_cond _br_2">컨</th>
        <th className="_th_result _br_2">1</th>
        <th className="_th_result _br_2">2</th>
        <th className="_th_result _br_2">3</th>
        <th className="_th_comment _br_2">V</th>
        <th className="_th_club">클럽</th>
      </tr>
    </thead>
  )
}
