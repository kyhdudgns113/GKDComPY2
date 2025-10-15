import {CircleInfo} from '@component'
import {useMemberStates} from '@store'

import {GoldCrown, SilverCrown} from '../components'

import type {FC} from 'react'
import type {TableCommonProps} from '@prop'

import * as SV from '@shareValue'

import '../_styles/MemberTablePart.scss'

type MemberTablePartProps = TableCommonProps & {}

export const MemberTablePart: FC<MemberTablePartProps> = ({className, style, ...props}) => {
  const {clubMemberArr} = useMemberStates()

  return (
    <table className={`MemberTable_Part ${className || ''}`} style={style} {...props}>
      <thead>
        <tr className="tr_head">
          <th className="_th_crown"></th>
          <th className="_th_name">멤버 이름</th>
          <th className="_th_batterPower">타자</th>
          <th className="_th_pitcherPower">투수</th>
          <th className="_th_info">-</th>
        </tr>
      </thead>
      <tbody>
        {clubMemberArr.map((member, memIdx) => {
          const isBottomBlue = memIdx % 10 === 9
          const isBottomGreen = !isBottomBlue && memIdx % 5 === 4

          return (
            <tr className={`tr_body ${isBottomBlue ? '__blue' : isBottomGreen ? '__green' : ''}`} key={memIdx}>
              <td className={`_td_crown `}>
                {member.position === SV.MEMBER_POSITION_GOLD ? (
                  <GoldCrown />
                ) : member.position === SV.MEMBER_POSITION_SILVER ? (
                  <SilverCrown />
                ) : (
                  <></>
                )}
              </td>
              <td className="_td_name">{member.memName}</td>
              <td className="_td_batterPower">{member.batterPower.toLocaleString()}</td>
              <td className="_td_pitcherPower">{member.pitcherPower.toLocaleString()}</td>
              <td className="_td_info">
                <CircleInfo />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
