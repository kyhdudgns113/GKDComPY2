import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientAuthPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // POST AREA:

  async signIn(data: HTTP.SignInDataType) {
    const where = `/client/auth/signIn`
    const {userId, password} = data

    try {
      const {user} = await this.dbHubService.readUserByIdPw(where, userId, password)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'AUTH_signIn',
          gkdErrMsg: `유저 정보 조회 실패`,
          gkdStatus: {userId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // GET AREA:

  async refreshToken(jwtPayload: T.JwtPayloadType) {
    const where = `/client/auth/refreshToken`
    const {userId, userOId} = jwtPayload

    try {
      const {user} = await this.dbHubService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'AUTH_refreshToken',
          gkdErrMsg: `유저 정보 조회 실패`,
          gkdStatus: {userId, userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
