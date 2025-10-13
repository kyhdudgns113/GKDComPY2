import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientChatPortService} from '@modules/database/ports/clientPorts/clientChatPort'

import * as U from '@util'

@Injectable()
export class ClientChatService {
  constructor(private readonly portService: ClientChatPortService) {}

  // GET AREA:

  async loadClubChatArr(jwtPayload: JwtPayloadType, clubOId: string, lastChatIdx: string) {
    try {
      const {chatArr} = await this.portService.loadClubChatArr(jwtPayload, clubOId, lastChatIdx)
      return {ok: true, body: {chatArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
