// AREA1: Create

export type CreateChatDTO = {
  chatIdx: number
  chatRoomOId: string
  content: string
  userId: string
  userOId: string
}

export type CreateClubDTO = {
  commOId: string
  clubName: string
  clubIdx: number
}

export type CreateClubMemberDTO = {
  commOId: string
  clubOId: string
  memName: string
  batterPower: number
  pitcherPower: number
}

export type CreateCommunityAdminDTO = {
  commName: string
}

export type CreateOrUpdateDailyRecordDTO = {
  weekOId: string
  rowMemName: string
  dateVal: number
  result0: number
  result1: number
  result2: number
  condError: number
  comment: string
}

export type CreateUserAdminDTO = {
  userId: string
  password: string
}

export type CreateUserDTO = {
  commOId: string
  userId: string
  password: string
}

export type CreateWeekRowDTO = {
  clubOId: string
  startDateVal: number
  endDateVal: number
  isNext: boolean
  title: string
}

export type CreateRowMemberDTO = {
  weekOId: string
  memOId: string | null
  rowMemName: string
  batterPower: number
  pitcherPower: number
  position: number
}

// AREA2: Update

export type UpdateClubDTO = {
  clubOId: string
  newClubName: string
}

export type UpdateCommDocDTO = {
  commOId: string
  contents: string
}

export type UpdateDocumentDTO = {
  clubOId: string
  contents: string
}

export type UpdateMemberClubOIdDTO = {
  memOId: string
  newClubOId: string
}

export type UpdateMemberCardDTO = {
  memOId: string
  posIdx: number
  cardName: string
  cardNumber: number | null
  skillIdxs: number[]
  skillLevels: number[]
}

export type UpdateMemberInfoDTO = {
  memOId: string
  memName: string
  batterPower: number
  pitcherPower: number
  memberComment: string
  position: number
}

export type UpdateUserDTO = {
  userOId: string
  newUserId: string
  newPassword: string
  newCommAuth: number
}

export type UpdateDateInfoDTO = {
  weekOId: string
  dateVal: number
  enemyName: string
  pitchOrder: number
  dailyOrder: string
  comments: string
}

export type UpdateRowMemberDTO = {
  weekOId: string
  prevRowMemName: string
  newRowMemName?: string
  memOId: string | null
  batterPower: number
  pitcherPower: number
  position?: number
}

export type UpdateWeeklyInfoDTO = {
  weekOId: string
  weekComments: string
}
