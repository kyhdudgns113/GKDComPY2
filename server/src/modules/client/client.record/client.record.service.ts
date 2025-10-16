import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientRecordPortService} from '@modules/database'
import {GKDJwtService} from '@modules/gkdJwt'

import * as T from '@type'
import * as U from '@util'

@Injectable()
export class ClientRecordService {
  constructor(
    private readonly jwtService: GKDJwtService,
    private readonly portService: ClientRecordPortService
  ) {}

  // GET AREA:

  async loadClubWeekRowArr(jwtPayload: JwtPayloadType, clubOId: string) {
    try {
      const {weekRowArr} = await this.portService.loadClubWeekRowArr(jwtPayload, clubOId)
      return {ok: true, body: {weekRowArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
