import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class SocketPortService {
  constructor(private readonly dbHubService: DBHubService) {}

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
