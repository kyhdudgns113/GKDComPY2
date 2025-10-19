export type AddClubMemberDataType = {
  clubOId: string
  commOId: string
  memName: string
  batterPower: number
  pitcherPower: number
}

export type AddCommClubDataType = {
  commOId: string
  clubName: string
}

export type AddCommunityDataType = {
  commName: string
}

export type AddCommUserDataType = {
  commOId: string
  userId: string
  password: string
}

export type AddNextWeekDataType = {
  clubOId: string
}

export type AddPrevWeekDataType = {
  clubOId: string
}

export type AddRowMemberDataType = {
  weekOId: string
  rowMemName: string
  batterPower: number
  pitcherPower: number
  position: number
}

export type ModifyClubDocDataType = {
  clubOId: string
  contents: string
}

export type ModifyCommClubDataType = {
  clubOId: string
  newClubName: string
}

export type ModifyCommUserDataType = {
  userOId: string
  newUserId: string
  newPassword: string
  newCommAuth: number
}

export type ModifyDailyInfoDataType = {
  weekOId: string
  dateVal: number
  enemyName: string
  pitchOrder: number
  dailyOrder: string
  comments: string
}

export type ModifyRowMemberInfoDataType = {
  weekOId: string
  prevRowMemName: string
  newRowMemName: string
  batterPower: number
  pitcherPower: number
  position: number
}

export type MoveClubMemberDataType = {
  prevClubOId: string
  clubOId: string
  memOId: string
}

export type ModifyWeeklyInfoDataType = {
  weekOId: string
  weekComments: string
}

export type SaveClubMemberInfoDataType = {
  clubOId: string
  memOId: string
  memName: string
  batterPower: number
  pitcherPower: number
  memberComment: string
  position: number
}

export type SignInDataType = {
  userId: string
  password: string
}

export type SignUpDataType = {
  userId: string
  password: string
}
export type WriteDailyRecordDataType = {
  weekOId: string
  rowMemName: string
  dateVal: number
  result0: number
  result1: number
  result2: number
  condError: number
  comment: string
}
