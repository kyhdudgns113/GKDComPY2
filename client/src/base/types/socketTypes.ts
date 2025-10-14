// AREA1: 클라이언트가 전송할때 쓰는 타입

export type SocketRequestValidationType = {
  jwtFromClient: string
}

export type UserConnectType = {
  userOId: string
  jwtFromClient: string
}

// AREA2: 서버가 전송할때 쓰는 타입

export type SocketResponseValidationType = {
  jwtFromServer: string
}
