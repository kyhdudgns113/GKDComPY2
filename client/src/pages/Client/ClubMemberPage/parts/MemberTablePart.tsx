import {useCallback} from 'react'

import {CircleInfo} from '@component'
import {useAppDispatch, useMemberActions, useMemberStates} from '@store'

import {GoldCrown, SilverCrown} from '../components'

import type {FC, MouseEvent} from 'react'
import type {TableCommonProps} from '@prop'
import type {MemberType} from '@shareType'

import * as SV from '@shareValue'

import '../_styles/MemberTablePart.scss'

type MemberTablePartProps = TableCommonProps & {}

export const MemberTablePart: FC<MemberTablePartProps> = ({className, style, ...props}) => {
  const {clubMemberArr} = useMemberStates()
  const {setClubMemberOpened} = useMemberActions()

  const dispatch = useAppDispatch()

  const onClickIcon = useCallback(
    (member: MemberType) => (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation()
      dispatch(setClubMemberOpened(member))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

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
                <CircleInfo onClick={onClickIcon(member)} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
