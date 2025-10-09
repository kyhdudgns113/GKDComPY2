import {AdminCommPortService} from '@modules/database'
import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'

import * as U from '@util'

@Injectable()
export class AdminCommunityService {
  constructor(private readonly portService: AdminCommPortService) {}

  // GET AREA:

  async loadCommArr(jwtPayload: JwtPayloadType) {
    try {
      const {commArr} = await this.portService.loadCommArr(jwtPayload)

      return {ok: true, body: {commArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
