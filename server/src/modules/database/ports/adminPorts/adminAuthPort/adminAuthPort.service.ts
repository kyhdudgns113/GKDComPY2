import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'
import {ADMIN_USER_ID} from '@secret'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class AdminAuthPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // POST AREA:

  /**
   * signIn
   * - 관리자 사이트의 로그인 함수
   *
   * 입력값
   * - userId: string
   *     + Id
   * - password: string
   *     + 비밀번호
   *
   * 출력값
   * - User 타입 데이터
   *
   * 작동 순서
   * 1. 에러 검출
   *     1. ID 비어있나 확인
   *     2. 비밀번호 비어있나 확인
   * 2. 해당 Id 비번의 유저 있나 췍!!
   * 3. 리턴 뙇!!
   */
  async signIn(data: HTTP.SignInDataType) {
    const where = '/admin/auth/signIn'
    const {userId, password} = data

    try {
      // 1. 에러 검출
      if (!userId) {
        throw {
          gkd: {userId: `userId 가 비었어요`},
          gkdErrCode: 'ADMIN_SIGNIN_EMPTY_USERID',
          gkdErrMsg: `userId 가 비었어요`,
          gkdStatus: {},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }
      // 2. 해당 Id 비번의 유저 있나 췍!!
      const {user} = await this.dbHubService.readUserByIdPw(where, userId, password)
      if (!user) {
        throw {
          gkd: {user: `ID 또는 비밀번호가 일치하지 않아요`},
          gkdErrCode: 'ADMIN_SIGNIN_EMPTY_USER',
          gkdErrMsg: `ID 또는 비밀번호가 일치하지 않아요`,
          gkdStatus: {userId},
          statusCode: 500,
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

  /**
   * signUp
   * - 관리자 사이트의 계정생성 함수
   *
   * 입력값
   * - userId: string
   *     + Id
   *     + ADMIN_USER_ID 여야함
   * - password: string
   *     + 비밀번호
   *     + 관리자 사이트에서는 특별히 제한을 두지 않음
   *
   * 작동 순서
   * 1. 에러 검출
   *     1. ID 비어있나 확인
   *     2. 비밀번호 비어있나 확인
   *     3. ID 가 ADMIN_USER_ID 가 아닌지 확인
   * 2. 계정 생성 뙇!!
   *
   * 출력값
   * - 없음
   */
  async signUp(data: HTTP.SignUpDataType) {
    const where = '/admin/auth/signUp'
    const {userId, password} = data

    try {
      // 1-1. ID 비어있나 확인
      if (!userId) {
        throw {
          gkd: {userId: `userId 가 비었어요`},
          gkdErrCode: 'ADMIN_SIGNUP_EMPTY_USERID',
          gkdErrMsg: `userId 가 비었어요`,
          gkdStatus: {},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }
      // 1-2. 비밀번호 비어있나 확인
      if (!password) {
        throw {
          gkd: {password: `password 가 비었어요`},
          gkdErrCode: 'ADMIN_SIGNUP_EMPTY_PASSWORD',
          gkdErrMsg: `password 가 비었어요`,
          gkdStatus: {},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }
      // 1-3. ID 가 ADMIN_USER_ID 가 아닌지 확인
      if (userId !== ADMIN_USER_ID) {
        throw {
          gkd: {userId: `userId 가 ADMIN_USER_ID 가 아니에요`},
          gkdErrCode: 'ADMIN_SIGNUP_NOT_ADMIN_ID',
          gkdErrMsg: `userId 가 ADMIN_USER_ID 가 아니에요`,
          gkdStatus: {userId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 2. 계정 생성 뙇!!
      const dto: DTO.CreateUserAdminDTO = {userId, password}
      await this.dbHubService.createUserAdmin(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // GET AREA:

  async refreshToken(jwtPayload: T.JwtPayloadType) {
    const where = `/admin/auth/refreshToken`
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
