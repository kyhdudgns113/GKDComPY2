export type CommunityType = {
  banClubOId: string // 탈퇴멤버 모아둔 더미클럽
  clubOIdsArr: string[] // 멤버 시뮬레이션 페이지를 위해서 남겨둔다.
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
