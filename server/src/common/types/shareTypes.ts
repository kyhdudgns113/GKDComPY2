export type CardType = {
  memOId: string
  cardName: string | null // DB 에 null 로 저장되었을 수 있다.
  posIdx: number
  skillIdxs: number[]
  skillLevels: number[]
}

export type ChatType = {
  chatIdx: number
  chatRoomOId: string
  content: string
  date: Date
  userId: string
  userOId: string
}

export type ChatRoomType = {
  chatRoomOId: string
  clubOId: string
  numChat?: number // 서버에서 채팅 갯수 읽어올때 사용
}

export type ClubType = {
  /**
   * 기존에 있던 다음 property 들은 사용하지 않는다
   * - chatRoomOId
   * - docOId
   * - weekRowsArr
   *
   * 위 속성들은 필요할때 불러오던가 사용하지 말던가 하자
   */
  chatRoomOId: string
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

export type DocumentType = {
  documentOId: string
  clubOId: string
  contents: string
}

export type MemberType = {
  batterPower: number
  clubOId: string
  commOId: string
  deck: CardType[]
  lastRecorded: number | null
  memberComment: string
  memOId: string
  memName: string
  position: number
  pitcherPower: number
}

export type UserType = {
  commAuth: number
  commOId: string
  userOId: string
  userId: string
}

export type WeekRowType = {
  weekOId: string
  startDateVal: number
  endDateVal: number
  title: string
}
