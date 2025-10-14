import {Injectable} from '@nestjs/common'
import {Server, Socket} from 'socket.io'

import {GKDJwtService} from '@modules/gkdJwt'
import {SocketInfoService} from './socket.info.service'
import {SocketPortService} from '@modules/database'

import * as SCK from '@socketType'
import * as T from '@type'

/**
 * SocketGatewayService
 */
@Injectable()
export class SocketGatewayService {
  constructor(
    private readonly infoService: SocketInfoService,
    private readonly jwtService: GKDJwtService,
    private readonly portService: SocketPortService
  ) {}

  // AREA1: Base Area

  handleDisconnect(client: Socket) {
    try {
      this.infoService.leaveSocketFromUser(client)
      // ::
    } catch (errObj) {
      // ::
      console.log(`\n[SocketGatewayService] handleDisconnect 에러 발생: ${errObj}`)
      Object.keys(errObj).forEach(key => {
        console.log(`   ${key}: ${errObj[key]}`)
      })
    }
  }

  // AREA2: GKDoubleJWT Validation Area

  async requestValidation(client: Socket, payload: SCK.SocketRequestValidationType) {
    try {
      const {ok, body, errObj} = await this.jwtService.requestValidationSocket(payload.jwtFromClient)

      if (ok) {
        const {jwtFromServer} = body
        const payload: SCK.SocketResponseValidationType = {jwtFromServer}
        return {client, payload}
      } // ::
      else {
        const jwtFromServer = ''
        const payload: SCK.SocketResponseValidationType = {jwtFromServer}

        console.log(`\n유저 소켓 토큰 인증중 에러 발생: ${errObj}`)
        Object.keys(errObj).forEach(key => {
          console.log(`   ${key}: ${errObj[key]}`)
        })

        return {client, payload}
      }
      // ::
    } catch (errObj) {
      // ::
      const jwtFromServer = ''
      const payload: SCK.SocketResponseValidationType = {jwtFromServer}

      console.log(`\n유저 소켓 토큰 인증중 치명적인 에러 발생: ${errObj}`)
      Object.keys(errObj).forEach(key => {
        console.log(`   ${key}: ${errObj[key]}`)
      })

      return {client, payload}
    }
  }

  // AREA3: User Service Area

  userConnect(client: Socket, payload: SCK.UserConnectType) {
    try {
      this.infoService.joinSocketToUser(client, payload.userOId)
      // ::
    } catch (errObj) {
      // ::
      console.log(`\n[SocketGatewayService] userConnect 에러 발생: ${errObj}`)
      Object.keys(errObj).forEach(key => {
        console.log(`   ${key}: ${errObj[key]}`)
      })
    }
  }

  // AREA4: Chat Room Service Area

  async chatRoomConnect(server: Server, client: Socket, _payload: SCK.ChatRoomConnectType) {
    const {chatRoomOId, jwtFromClient, userOId} = _payload

    /**
     * 1. 이 소켓이 해당 유저인지 확인
     * 2. 해당 유저가 채팅방에 속한 유저인지 확인
     * 3. 소켓을 채팅방에 참여시키고, 안 읽은 메시지 갯수를 0으로 초기화 뙇!!
     */

    try {
      // 1. 이 소켓이 해당 유저인지 확인
      const isSameUser = this.infoService.readSocketsUserOId(client) === userOId
      if (!isSameUser) {
        throw {
          gkd: {noUser: `유저가 다름`},
          gkdErrCode: 'SocketChatService_chatRoomConnect_noUser',
          gkdErrMsg: `유저가 다릅니다.`,
          gkdStatus: {userOId, chatRoomOId},
          statusCode: 400,
          where: 'chatRoomConnect'
        } as T.ErrorObjType
      }

      // 2. 해당 유저가 채팅방에 속한 유저인지 확인
      const isUserInChatRoom = await this.portService.isUserInChatRoom(userOId, chatRoomOId)
      if (!isUserInChatRoom) {
        throw {
          gkd: {noUser: `유저가 채팅방에 참여중이지 않음`},
          gkdErrCode: 'SocketChatService_chatRoomConnect_noUserInChatRoom',
          gkdErrMsg: `유저가 채팅방에 참여중이지 않습니다.`,
          gkdStatus: {userOId, chatRoomOId},
          statusCode: 400,
          where: 'chatRoomConnect'
        } as T.ErrorObjType
      }

      // 3. 소켓을 채팅방에 참여시킨다.
      await this.infoService.joinSocketToChatRoom(client, chatRoomOId)

      const payload: SCK.ChatRoomOpenedType = {chatRoomOId}

      return {server, roomId: chatRoomOId, payload}

      // ::
    } catch (errObj) {
      // ::
      console.log(`\n[SocketGatewayService] chatRoomConnect 에러 발생: ${errObj}`)
      Object.keys(errObj).forEach(key => {
        console.log(`   ${key}: ${errObj[key]}`)
      })
      throw errObj
    }
  }

  async chatRoomDisconnect(server: Server, client: Socket, _payload: SCK.ChatRoomDisconnectType) {
    try {
      await this.infoService.leaveSocketFromChatRoom(server, client, _payload.chatRoomOId)
      // ::
    } catch (errObj) {
      // ::
      console.log(`\n[SocketGatewayService] chatRoomDisconnect 에러 발생: ${errObj}`)
      Object.keys(errObj).forEach(key => {
        console.log(`   ${key}: ${errObj[key]}`)
      })
      throw errObj
    }
  }
}
