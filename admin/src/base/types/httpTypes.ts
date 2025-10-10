export type AddCommunityDataType = {
  commName: string
}

export type AddCommUserDataType = {
  commOId: string
  userId: string
  password: string
}

export type ModifyCommUserDataType = {
  userOId: string
  newUserId: string
  newPassword: string
  newCommAuth: number
}

export type SignInDataType = {
  userId: string
  password: string
}

export type SignUpDataType = {
  userId: string
  password: string
}
