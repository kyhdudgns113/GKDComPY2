import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'
import {GKDLockService} from '@modules/gkdLock'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class SocketPortService {
  constructor(
    private readonly dbHubService: DBHubService,
    private readonly lockService: GKDLockService
  ) {}

  /**
   * chatMessage
   *   - 채팅 메시지 전송
   *
   * 입력값
   * - userOId: 유저 고유 아이디
   * - chatRoomOId: 채팅방 고유 아이디
   * - content: 채팅 메시지 내용
   *
   * 출력값
   * - chat: 새로 생성된 채팅 메시지
   * - user: 채팅 메시지를 보낸 유저 정보
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 채팅방 락 뙇!!
   * 3. 채팅방 정보 뙇!!
   * 4. 채팅 생성 뙇!!
   * 5. 리턴 뙇!!
   */
  async chatMessage(userOId: string, chatRoomOId: string, content: string) {
    const where = '/socketPort/chatMessage'
    let lockString = ''
    try {
      const jwtPayload: T.JwtPayloadType = {
        userId: '',
        userOId
      }
      // 1. 권한 췍!!
      const {user} = await this.dbHubService.checkAuth_ChatRoomWrite(where, jwtPayload, chatRoomOId)

      // 2. 채팅방 락 뙇!!
      lockString = await this.lockService.readyLock(`${chatRoomOId}`)

      // 3. 채팅방 정보 뙇!!
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

      // 4. 채팅 생성 뙇!!
      const dto: DTO.CreateChatDTO = {
        chatIdx,
        chatRoomOId,
        content,
        userId: user.userId,
        userOId: user.userOId
      }
      const {chat} = await this.dbHubService.createChat(where, dto)

      // 5. 리턴 뙇!!
      return {chat, user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      if (lockString) {
        this.lockService.releaseLock(lockString)
      }
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
