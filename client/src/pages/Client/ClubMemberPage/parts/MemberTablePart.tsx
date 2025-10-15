import type {FC} from 'react'
import type {TableCommonProps} from '@prop'

import '../_styles/MemberTablePart.scss'

type MemberTablePartProps = TableCommonProps & {}

export const MemberTablePart: FC<MemberTablePartProps> = ({className, style, ...props}) => {
  return (
    <table className={`MemberTable_Part ${className || ''}`} style={style} {...props}>
      <thead>
        <tr>
          <th className="_th_crown">왕관</th>
          <th className="_th_name">멤버 이름</th>
          <th className="_th_batterPower">타자력</th>
          <th className="_th_pitcherPower">투수력</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="_td_crown">왕관</td>
          <td className="_td_name">멤버 이름</td>
          <td className="_td_batterPower">타자력</td>
          <td className="_td_pitcherPower">투수력</td>
        </tr>
      </tbody>
    </table>
  )
}
