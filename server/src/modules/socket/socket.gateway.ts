import {Server, Socket} from 'socket.io'
import {UseGuards} from '@nestjs/common'
import {SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets'

import {CheckSocketJwtGuard} from '@guard'
import {SendSocketClientMessage, SendSocketRoomMessage} from '@util'

import {SocketGatewayService} from './socket.gateway.service'

import * as SCK from '@socketType'

/**
 * SocketGateway
 *
 *   - 소켓메시지 송수신, 소켓서버 관리용으로 쓴다.
 */
@WebSocketGateway({cors: true})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gatewayService: SocketGatewayService) {}

  // AREA1: Base Area

  @WebSocketServer()
  server: Server

  handleConnection(client: Socket) {
    // DO NOTHING:
  }
  handleDisconnect(client: Socket) {
    /**
     * 에러처리는 gatewayService 에서 한다.
     */
    this.gatewayService.handleDisconnect(client)
  }

  // AREA2: GKDoubleJWT Validation Area

  @SubscribeMessage('request validation')
  @SendSocketClientMessage('response validation')
  async requestValidation(client: Socket, _payload: SCK.SocketRequestValidationType) {
    /**
     * 에러처리는 gatewayService 에서 한다.
     */
    const {payload} = await this.gatewayService.requestValidation(client, _payload)
    return {client, payload}
  }

  // AREA3: User Service Area

  @SubscribeMessage('user connect')
  @UseGuards(CheckSocketJwtGuard)
  userConnect(client: Socket, payload: SCK.UserConnectType) {
    /**
     * 에러처리는 gatewayService 에서 한다.
     */
    this.gatewayService.userConnect(client, payload)
    // ::
  }

  // AREA4: Chat Room Service Area

  @SubscribeMessage('chatRoom connect')
  @SendSocketRoomMessage('chatRoom opened')
  async chatRoomConnect(client: Socket, _payload: SCK.ChatRoomConnectType) {
    /**
     * 에러처리는 gatewayService 에서 한다.
     */
    const {server, roomId, payload} = await this.gatewayService.chatRoomConnect(this.server, client, _payload)
    return {server, roomId, payload}
  }

  @SubscribeMessage('chatRoom disconnect')
  async chatRoomDisconnect(client: Socket, _payload: SCK.ChatRoomDisconnectType) {
    /**
     * 에러처리는 gatewayService 에서 한다.
     */
    await this.gatewayService.chatRoomDisconnect(this.server, client, _payload)
    // ::
  }
}
