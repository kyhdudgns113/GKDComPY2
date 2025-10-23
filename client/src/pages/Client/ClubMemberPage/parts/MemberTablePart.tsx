import {useCallback} from 'react'

import {Icon, IconFilled} from '@component'
import {useAppDispatch, useMemberActions, useMemberStates} from '@store'

import {GoldCrown, SilverCrown} from '../components'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {MemberType} from '@shareType'

import * as SV from '@shareValue'

import '../_styles/MemberTablePart.scss'

type MemberTablePartProps = DivCommonProps & {}

export const MemberTablePart: FC<MemberTablePartProps> = ({className, style, ...props}) => {
  const {clubMemberArr} = useMemberStates()
  const {setClubMemberOpened, setMemSortTypeName, setMemSortTypeBatter, setMemSortTypePitcher, setMemSortTypeTotal, sortClubMemberArr} =
    useMemberActions()

  const dispatch = useAppDispatch()

  const onClickName = useCallback(
    (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(setMemSortTypeName())
      dispatch(sortClubMemberArr())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )
  const onClickBatter = useCallback(
    (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(setMemSortTypeBatter())
      dispatch(sortClubMemberArr())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )
  const onClickPitcher = useCallback(
    (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(setMemSortTypePitcher())
      dispatch(sortClubMemberArr())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )
  const onClickTotal = useCallback(
    (e: MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      dispatch(setMemSortTypeTotal())
      dispatch(sortClubMemberArr())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickMember = useCallback(
    (member: MemberType) => (e: MouseEvent<HTMLTableRowElement>) => {
      e.stopPropagation()
      dispatch(setClubMemberOpened(member))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`MemberTable_Part ${className || ''}`} style={style} {...props}>
      <table>
        <thead>
          <tr className="tr_head">
            <th className="_th_crown"></th>
            <th className="_th_name" onClick={onClickName} onMouseDown={e => e.preventDefault()}>
              멤버 이름
            </th>
            <th className="_th_batterPower" onClick={onClickBatter} onMouseDown={e => e.preventDefault()}>
              타자
            </th>
            <th className="_th_pitcherPower" onClick={onClickPitcher} onMouseDown={e => e.preventDefault()}>
              투수
            </th>
            <th className="_th_info" onClick={onClickTotal} onMouseDown={e => e.preventDefault()}>
              T
            </th>
          </tr>
          <tr className="tr_head_shadow">
            <th className="_th_crown"></th>
            <th className="_th_name"></th>
            <th className="_th_batterPower"></th>
            <th className="_th_pitcherPower"></th>
            <th className="_th_info"></th>
          </tr>
        </thead>
        <tbody>
          {clubMemberArr.map((member, memIdx) => {
            const isBottomBlue = memIdx % 10 === 9
            const isBottomGreen = !isBottomBlue && memIdx % 5 === 4

            return (
              <tr
                className={`tr_body ${isBottomBlue ? '__blue' : isBottomGreen ? '__green' : ''}`}
                key={memIdx}
                onClick={onClickMember(member)} // ::
              >
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
                  {member.memberComment.length > 0 ? (
                    <IconFilled className="_icon_info" iconName="info" />
                  ) : (
                    <Icon className="_icon_info" iconName="info" />
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
