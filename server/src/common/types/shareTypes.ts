export type CardType = {
  cardName: string
  cardNumber: number | null // 레전드 출소 번호. 공란이면 null
  memOId: string
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

export type DailyRecordType = {
  clubOId: string
  comment: string
  condError: number
  dateVal: number
  memOId: string | null
  result0: number
  result1: number
  result2: number
  rowMemName: string
  weekOId: string
}

export type DocumentType = {
  documentOId: string
  clubOId: string
  contents: string
}

export type EMemberType = {
  batterPower: number
  clubOId: string
  memName: string
  pitcherPower: number
  position: number
  posIdx: number
  prevClubOId: string
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

export type RecordDateInfo = {
  clubOId: string
  comments: string
  dailyOrder: string
  dateVal: number
  enemyName: string
  pitchOrder: number
  teamResultArr: number[][] // [팀명, T, 포인트, 승, 무, 패, 포인트, T, 팀명] * 3, DB에는 string 으로 저장한다.
  weekOId: string
}

export type RowMemberType = {
  batterPower: number
  memOId: string
  pitcherPower: number
  position: number
  rowMemName: string
  weekOId: string
}

export type UserType = {
  commAuth: number
  commOId: string
  userOId: string
  userId: string
}

export type WeekRowType = {
  clubOId: string
  endDateVal: number
  startDateVal: number
  title: string
  weekComments: string
  weekOId: string
}
