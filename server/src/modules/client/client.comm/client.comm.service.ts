import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientCommPortService} from '@modules/database'

import * as HTTP from '@httpDataType'
import * as U from '@util'

@Injectable()
export class ClientCommService {
  constructor(private readonly portService: ClientCommPortService) {}

  // POST AREA:

  async addCommUser(jwtPayload: JwtPayloadType, data: HTTP.AddCommUserDataType) {
    try {
      const {userArr} = await this.portService.addCommUser(jwtPayload, data)
      return {ok: true, body: {userArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // GET AREA:

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
