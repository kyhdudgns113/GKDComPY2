import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class SocketPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  async chatMessage(userOId: string, chatRoomOId: string, content: string) {
    const where = '/socketPort/chatMessage'
    try {
      const jwtPayload: T.JwtPayloadType = {
        userId: '',
        userOId
      }
      // 1. 권한 췍!!
      const {user} = await this.dbHubService.checkAuth_ChatRoomWrite(where, jwtPayload, chatRoomOId)

      // 2. 채팅방 정보 읽기
      const {chatRoom} = await this.dbHubService.readChatRoomByChatRoomOId(where, chatRoomOId)

      if (!chatRoom) {
        throw {
          gkd: {chatRoomErr: `채팅방이 존재하지 않음`},
          gkdErrCode: 'SOCKETPORT_CHAT_MESSAGE_NO_CHAT_ROOM',
          gkdErrMsg: `채팅방이 존재하지 않음`,
          gkdStatus: {chatRoomOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const chatIdx = chatRoom.numChat || 0

      // 3. 채팅 생성
      const dto: DTO.CreateChatDTO = {
        chatIdx,
        chatRoomOId,
        content,
        userId: user.userId,
        userOId: user.userOId
      }
      const {chat} = await this.dbHubService.createChat(where, dto)

      return {chat, user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async isUserInChatRoom(userOId: string, chatRoomOId: string) {
    const where = '/socketPort/isUserInChatRoom'
    try {
      const jwtPayload: T.JwtPayloadType = {
        userId: '',
        userOId
      }
      await this.dbHubService.checkAuth_ChatRoomRead(where, jwtPayload, chatRoomOId)

      return true
      // ::
    } catch (errObj) {
      // ::
      return false
    }
  }
}
