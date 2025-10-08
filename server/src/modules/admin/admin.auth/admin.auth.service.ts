import {Injectable} from '@nestjs/common'
import {AdminAuthPortService} from '@modules/database/ports'
import {GKDJwtService} from '@modules/gkdJwt'

import * as HTTP from '@httpDataType'
import * as T from '@type'
import * as U from '@util'

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: GKDJwtService,
    private readonly portService: AdminAuthPortService
  ) {}

  // POST AREA:

  async signIn(data: HTTP.SignInDataType) {
    try {
      // 1. 로그인 가능한지 뙇!!
      const {user} = await this.portService.signIn(data)

      // 2. ID 비번 일치 안하면 에러 뙇!!
      if (!user) {
        throw {
          gkd: {user: `왜 user 가 비어있지?`},
          gkdErrCode: 'ADMIN_SIGNIN_EMPTY_USER',
          gkdErrMsg: `왜 user 가 비어있지?`,
          gkdStatus: {userId: data.userId},
          statusCode: 500,
          where: '/admin/auth/signIn'
        } as T.ErrorObjType
      }
      const {userId, userOId} = user
      const jwtPayload: T.JwtPayloadType = {userId, userOId}

      // 3. JWT 생성 뙇!!
      const {jwtFromServer} = await this.jwtService.signAsync(jwtPayload)

      return {ok: true, body: {user}, gkdErrMsg: '', statusCode: 200, jwtFromServer}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async signUp(data: HTTP.SignUpDataType) {
    try {
      await this.portService.signUp(data)

      return {ok: true, body: {}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // GET AREA:

  async refreshToken(jwtPayload: T.JwtPayloadType) {
    /**
     * 이 함수는 토큰 재발급 안해도 된다.
     * - guard 가 알아서 재발급 해줌.
     * 해당 유저가 중간에 삭제되지는 않았나만 체크하고 유저 정보만 갱신해준다.
     */
    try {
      const {user} = await this.portService.refreshToken(jwtPayload)
      return {ok: true, body: {user}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
