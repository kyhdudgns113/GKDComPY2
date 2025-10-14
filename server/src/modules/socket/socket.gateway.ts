import {Server, Socket} from 'socket.io'
import {UseGuards} from '@nestjs/common'
import {SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets'

import {GKDJwtService} from '@modules/gkdJwt'
import {SendSocketClientMessage, SendSocketRoomMessage} from '@util'

import {SocketInfoService} from './socket.info.service'

import * as T from '@type'
import * as ST from '@socketType'

/**
 * SocketGateway
 *
 *   - 소켓메시지 송수신, 소켓서버 관리용으로 쓴다.
 */
@WebSocketGateway({cors: true})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly socketInfoService: SocketInfoService) {}

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    console.log('Client connected')
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected')
  }
}
