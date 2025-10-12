import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'
import {ADMIN_USER_ID, AUTH_ADMIN} from '@secret'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class JwtPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  async checkUserAdmin(userOId: string) {
    const where = '/jwtPort/checkUserAdmin'
    try {
      const {user} = await this.dbHubService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'JWT_checkUserAdmin_NoUser',
          gkdErrMsg: `유저 정보 조회 실패 in ADMIN GUARD`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN) {
        throw {
          gkd: {userErr: `관리자가 아님`},
          gkdErrCode: 'JWT_checkUserAdmin_NotAdmin',
          gkdErrMsg: `관리자 아님 in ADMIN GUARD`,
          gkdStatus: {userOId, commAuth: user.commAuth},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
