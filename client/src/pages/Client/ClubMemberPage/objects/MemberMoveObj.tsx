import {useCallback} from 'react'

import {useClubStates, useCommunityStates, useMemberStates} from '@store'
import {useMemberCallbacksContext} from '@context'
import {Icon} from '@component'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberMoveObject.scss'
import type {MemberType} from '@shareType'

type MemberMoveObjProps = DivCommonProps & {}

export const MemberMoveObj: FC<MemberMoveObjProps> = ({className, style, ...props}) => {
  const {clubArr, community} = useCommunityStates()
  const {clubOpened} = useClubStates()
  const {clubMemberOpened} = useMemberStates()
  const {moveClubMember} = useMemberCallbacksContext()

  const onClickMove = useCallback(
    (member: MemberType, prevClubOId: string, targetClubOId: string, targetClubName: string) => (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()

      if (confirm(`${member.memName} 멤버를 ${targetClubName} 클럽으로 이동하시겠습니까?`)) {
        moveClubMember(prevClubOId, targetClubOId, member.memOId).then(res => {
          if (res) {
            alert('멤버 이동 성공')
          }
        })
      }
    },
    [moveClubMember]
  )

  return (
    <div
      className={`MemberMove_Obj ${className || ''}`}
      onClick={e => e.stopPropagation()}
      style={style}
      {...props} // ::
    >
      <p className="_title_obj">어디로 이동할까요?</p>

      <div className="_club_list_obj">
        {/* 1. 목적지 행: 클럽 리스트 */}
        {clubArr.map((club, clubIdx) => {
          if (club.clubOId === clubOpened.clubOId) {
            return null
          }

          return (
            <div key={clubIdx} className="_club_row_obj">
              <p className="_club_name_row">{club.clubName}</p>

              <Icon
                iconName="local_shipping"
                className="_icon_row"
                onClick={onClickMove(clubMemberOpened, clubOpened.clubOId, club.clubOId, club.clubName)}
              />
            </div>
          )
        })}

        {/* 2. 목적지 행: 후보군 */}
        {clubOpened.clubOId !== community.subClubOId && (
          <div className="_club_row_obj">
            <p className="_club_name_row">후보군</p>

            <Icon
              iconName="local_shipping"
              className="_icon_row"
              onClick={onClickMove(clubMemberOpened, clubOpened.clubOId, community.subClubOId, '후보군')}
            />
          </div>
        )}

        {/* 3. 목적지 행: 탈퇴 */}
        {clubOpened.clubOId !== community.banClubOId && (
          <div className="_club_row_obj">
            <p className="_club_name_row">탈퇴</p>

            <Icon
              iconName="local_shipping"
              className="_icon_row"
              onClick={onClickMove(clubMemberOpened, clubOpened.clubOId, community.banClubOId, '탈퇴')}
            />
          </div>
        )}
      </div>
    </div>
  )
}
