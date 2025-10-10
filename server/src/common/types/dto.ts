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

export type UpdateUserDTO = {
  userOId: string
  newUserId: string
  newPassword: string
  newCommAuth: number
}
