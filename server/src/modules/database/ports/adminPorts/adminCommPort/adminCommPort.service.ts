import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'
import {ADMIN_USER_ID} from '@secret'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'
import {JwtPayloadType} from '@type'

@Injectable()
export class AdminCommPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // GET AREA:

  async loadCommArr(jwtPayload: JwtPayloadType) {
    const where = `/admin/community/loadCommArr`
    try {
      const {commArr} = await this.dbHubService.readCommunityArr(where)
      return {commArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
