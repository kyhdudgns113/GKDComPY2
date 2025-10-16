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
  title: string
}

// AREA2: Update

export type UpdateClubDTO = {
  clubOId: string
  newClubName: string
}

export type UpdateDocumentDTO = {
  clubOId: string
  contents: string
}

export type UpdateMemberClubOIdDTO = {
  memOId: string
  newClubOId: string
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
