/**
 * Client 와 공유하지 않는다.
 */

export type ErrorObjType = {
  gkd: Object
  gkdErrCode: string
  gkdErrMsg: string
  gkdStatus: Object
  statusCode: number
  where: string
}
export type JwtPayloadType = {
  userId: string
  userOId: string
}
export type ServiceReturnType = {
  ok: boolean
  body: any
  errObj: any
  jwtFromServer?: string
}
export type SignUpType = 'common' | 'google'
