import * as T from '@type'

export const NULL_AUTH_BODY = () => {
  const ret: T.AuthBodyType = {
    jwtFromServer: '',
    userId: '',
    userOId: ''
  }
  return ret
}
