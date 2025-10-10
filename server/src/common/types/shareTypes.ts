export type ClubType = {
  /**
   * 기존에 있던 다음 property 들은 사용하지 않는다
   * - chatRoomOId
   * - docOId
   * - weekRowsArr
   *
   * 위 속성들은 필요할때 불러오던가 사용하지 말던가 하자
   */
  clubName: string
  clubOId: string
  commOId: string
}

export type CommunityType = {
  banClubOId: string // 탈퇴멤버 모아둔 더미클럽
  commOId: string
  commName: string
  maxUsers: number
  maxClubs: number
  subClubOId: string // 후보군 더미클럽
}

export type UserType = {
  commAuth: number
  commOId: string
  userOId: string
  userId: string
}
