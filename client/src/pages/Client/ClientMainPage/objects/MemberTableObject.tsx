import {useCommunityStates} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as NV from '@nullValue'

import '../_style/MemberTableObject.scss'

type MemberTableObjectProps = DivCommonProps & {}

export const MemberTableObject: FC<MemberTableObjectProps> = ({className, style, ...props}) => {
  const {clubArr, commMemberArr, community} = useCommunityStates()

  return (
    <div className={`MemberTable_Object ${className || ''}`} style={style} {...props}>
      <table>
        <thead>
          <tr className="tr_head">
            <th className="_th_number">#</th>
            <th className="_th_name">닉네임</th>
            <th className="_th_batterPower">타자</th>
            <th className="_th_pitcherPower">투수</th>
            <th className="_th_totalPower">총합</th>
            <th className="_th_club">클럽</th>
            <th className="_th_info">?</th>
          </tr>
          <tr className="tr_head_shadow">
            <th className="_th_number"></th>
            <th className="_th_name"></th>
            <th className="_th_batterPower"></th>
            <th className="_th_pitcherPower"></th>
            <th className="_th_totalPower"></th>
            <th className="_th_club"></th>
            <th className="_th_info"></th>
          </tr>
        </thead>
        <tbody>
          {commMemberArr.map((member, memIdx) => {
            const club = clubArr.find(club => club.clubOId === member.clubOId) || NV.NULL_CLUB()
            let clubName = club.clubName

            if (member.clubOId === community.banClubOId) {
              clubName = '탈퇴'
            } // ::
            else if (member.clubOId === community.subClubOId) {
              clubName = '후보군'
            }

            const isBlue = memIdx % 10 === 9
            const isGreen = !isBlue && memIdx % 5 === 4

            return (
              <tr className={`tr_body ${isBlue ? '__blue' : isGreen ? '__green' : ''}`} key={memIdx}>
                <td className="_td_number">{memIdx + 1}</td>
                <td className="_td_name">{member.memName}</td>
                <td className="_td_batterPower">{member.batterPower.toLocaleString()}</td>
                <td className="_td_pitcherPower">{member.pitcherPower.toLocaleString()}</td>
                <td className="_td_totalPower">{(member.batterPower + member.pitcherPower).toLocaleString()}</td>
                <td className="_td_club">{clubName}</td>
                <td className="_td_info">?</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
