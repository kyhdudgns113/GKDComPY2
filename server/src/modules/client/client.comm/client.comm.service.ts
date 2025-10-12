import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientCommPortService} from '@modules/database'

import * as U from '@util'

@Injectable()
export class ClientCommService {
  constructor(private readonly portService: ClientCommPortService) {}

  async loadCommunity(jwtPayload: JwtPayloadType, commOId: string) {
    try {
      const {community} = await this.portService.loadCommunity(jwtPayload, commOId)
      return {ok: true, body: {community}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
