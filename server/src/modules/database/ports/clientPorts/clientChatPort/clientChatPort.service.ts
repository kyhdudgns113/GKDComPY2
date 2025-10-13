import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientChatPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // GET AREA:

  /**
   * loadClubChatArr
   * - 클럽 채팅 배열 읽기 함수
   *
   * 입력값
   * - clubOId: string
   *     + 클럽의 OId
   *
   * 출력값
   * - chatArr: T.ChatType[]
   *     + 클럽 채팅 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 클럽 채팅 배열 읽기 뙇!!
   * 3. 반환 뙇!!
   */
  async loadClubChatArr(jwtPayload: T.JwtPayloadType, clubOId: string, lastChatIdx: string) {
    const where = `/client/chat/loadClubChatArr`

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_ClubRead(where, jwtPayload, clubOId)

      // 2. 클럽 채팅 배열 읽기 뙇!!
      const {chatArr} = await this.dbHubService.readChatArrByClubOId(where, clubOId, parseInt(lastChatIdx))

      // 3. 반환 뙇!!
      return {chatArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
