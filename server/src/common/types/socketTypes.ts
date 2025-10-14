// AREA1: 클라이언트가 전송할때 쓰는 타입

export type ChatRoomConnectType = {
  chatRoomOId: string
  jwtFromClient: string
  userOId: string
}

export type ChatRoomDisconnectType = {
  chatRoomOId: string
  userOId: string
}

export type SocketRequestValidationType = {
  jwtFromClient: string
}

export type UserConnectType = {
  userOId: string
  jwtFromClient: string
}

// AREA2: 서버가 전송할때 쓰는 타입

export type ChatRoomOpenedType = {
  chatRoomOId: string
}

export type SocketResponseValidationType = {
  jwtFromServer: string
}
