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
    try {
      const {payload} = await this.gatewayService.requestValidation(client, _payload)
      return {client, payload}
      // ::
    } catch (errObj) {
      /**
       * 에러처리는 gatewayService 에서 한다.
       */
    }
  }

  // AREA3: User Service Area

  @SubscribeMessage('user connect')
  @UseGuards(CheckSocketJwtGuard)
  userConnect(client: Socket, payload: SCK.UserConnectType) {
    try {
      this.gatewayService.userConnect(client, payload)
      // ::
    } catch (errObj) {
      /**
       * 에러처리는 gatewayService 에서 한다.
       */
    }
  }

  // AREA4: Chat Room Service Area

  @SubscribeMessage('chat message')
  @SendSocketRoomMessage('chat message')
  async chatMessage(client: Socket, _payload: SCK.ChatMessageType) {
    try {
      const {server, roomId, payload} = await this.gatewayService.chatMessage(this.server, client, _payload)
      return {server, roomId, payload}
      // ::
    } catch (errObj) {
      /**
       * 에러처리는 gatewayService 에서 한다.
       */
    }
  }

  @SubscribeMessage('chatRoom connect')
  @SendSocketRoomMessage('chatRoom opened')
  async chatRoomConnect(client: Socket, _payload: SCK.ChatRoomConnectType) {
    try {
      const {server, roomId, payload} = await this.gatewayService.chatRoomConnect(this.server, client, _payload)
      return {server, roomId, payload}
      // ::
    } catch (errObj) {
      /**
       * 에러처리는 gatewayService 에서 한다.
       */
    }
  }

  @SubscribeMessage('chatRoom disconnect')
  async chatRoomDisconnect(client: Socket, _payload: SCK.ChatRoomDisconnectType) {
    try {
      await this.gatewayService.chatRoomDisconnect(this.server, client, _payload)
      // ::
    } catch (errObj) {
      /**
       * 에러처리는 gatewayService 에서 한다.
       */
    }
    // ::
  }
}
