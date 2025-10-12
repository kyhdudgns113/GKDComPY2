import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientCommPortService} from '@modules/database'

import * as U from '@util'

@Injectable()
export class ClientCommService {
  constructor(private readonly portService: ClientCommPortService) {}

  async loadUsersCommunity(jwtPayload: JwtPayloadType) {
    try {
      const {clubArr, community, userArr} = await this.portService.loadUsersCommunity(jwtPayload)
      return {ok: true, body: {clubArr, community, userArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
