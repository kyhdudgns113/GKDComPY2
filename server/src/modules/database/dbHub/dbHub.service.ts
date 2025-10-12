import {Injectable} from '@nestjs/common'

import * as DTO from '@dto'
import * as T from '@type'
import * as TB from '../_tables'
import {AUTH_ADMIN, AUTH_GOLD, AUTH_NORMAL, AUTH_SILVER} from '@secret'

/**
 * 이곳은 거의 대부분 Schema 의 함수랑 결과를 그대로 보내주는 역할만 한다.
 *
 * 이것들은 port 에서 해줘야 한다.
 * - 인자의 Error 체크
 * - 권한 체크 함수 실행
 *    - port 에서 db 접근할때마다 권한체크하면 오버헤드 심해진다.
 *
 * 이건 여기서 해준다.
 * - 권한 체크 함수 작성
 */
@Injectable()
export class DBHubService {
  constructor(
    private readonly chatDBService: TB.ChatDBService,
    private readonly clubDBService: TB.ClubDBService,
    private readonly communityDBService: TB.CommunityDBService,
    private readonly dailyRecordDBService: TB.DailyRecordDBService,
    private readonly docDBService: TB.DocDBService,

    private readonly memberDBService: TB.MemberDBService,
    private readonly userDBService: TB.UserDBService,
    private readonly weekRecordDBService: TB.WeekRecordDBService
  ) {}

  // AREA2: Club Area

  async createClub(where: string, dto: DTO.CreateClubDTO) {
    try {
      const {club} = await this.clubDBService.createClub(where, dto)
      return {club}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readClubArrByCommOId(where: string, commOId: string) {
    try {
      const {clubArr} = await this.clubDBService.readClubArrByCommOId(where, commOId)
      return {clubArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA3: Community Area

  async createCommunity(where: string, dto: DTO.CreateCommunityAdminDTO) {
    try {
      const {community} = await this.communityDBService.createCommunity(where, dto)
      return {community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readCommunityArr(where: string) {
    try {
      const {commArr} = await this.communityDBService.readCommunityArr(where)
      return {commArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readCommunityByCommOId(where: string, commOId: string) {
    try {
      const {community} = await this.communityDBService.readCommunityByCommOId(where, commOId)
      return {community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA2: User Area

  async createUser(where: string, dto: DTO.CreateUserDTO) {
    try {
      const {user} = await this.userDBService.createUser(where, dto)
      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async createUserAdmin(where: string, dto: DTO.CreateUserAdminDTO) {
    try {
      await this.userDBService.createUserAdmin(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readUserArrByCommOId(where: string, commOId: string) {
    try {
      const {userArr} = await this.userDBService.readUserArrByCommOId(where, commOId)
      return {userArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readUserByIdPw(where: string, userId: string, password: string) {
    try {
      const {user} = await this.userDBService.readUserByIdPw(where, userId, password)
      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readUserByUserOId(where: string, userOId: string) {
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)
      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateUser(where: string, dto: DTO.UpdateUserDTO) {
    try {
      await this.userDBService.updateUser(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA1: Check Auth Area

  async checkUserAdmin(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_ADMIN_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN) {
        throw {
          gkd: {userErr: `관리자가 아님`},
          gkdErrCode: 'DBHUB_CHECK_USER_ADMIN_NOT_ADMIN',
          gkdErrMsg: `관리자가 아님`,
          gkdStatus: {userOId, commAuth: user.commAuth},
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
  async checkUserGold(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_GOLD_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }
      if (user.commAuth < AUTH_GOLD) {
        throw {
          gkd: {userErr: `골드가 아님`},
          gkdErrCode: 'DBHUB_CHECK_USER_GOLD_NOT_GOLD',
          gkdErrMsg: `골드가 아님`,
          gkdStatus: {userOId, commAuth: user.commAuth},
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
  async checkUserSilver(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_SILVER_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth < AUTH_SILVER) {
        throw {
          gkd: {userErr: `실버가 아님`},
          gkdErrCode: 'DBHUB_CHECK_USER_SILVER_NOT_SILVER',
          gkdErrMsg: `실버가 아님`,
          gkdStatus: {userOId, commAuth: user.commAuth},
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
  async checkUserNormal(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_NORMAL_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth < AUTH_NORMAL) {
        throw {
          gkd: {userErr: `권한값이 음수임`},
          gkdErrCode: 'DBHUB_CHECK_USER_NORMAL_NOT_NORMAL',
          gkdErrMsg: `권한값이 음수임`,
          gkdStatus: {userOId, commAuth: user.commAuth},
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

  async checkAuth_CommRead(where: string, jwtPayload: T.JwtPayloadType, commOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {community} = await this.communityDBService.readCommunityByCommOId(where, commOId)
      if (!community) {
        throw {
          gkd: {communityErr: `공동체가 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_COMMUNITY',
          gkdErrMsg: `공동체가 존재하지 않음`,
          gkdStatus: {commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && user.commOId !== commOId) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async checkAuth_CommWrite(where: string, jwtPayload: T.JwtPayloadType, commOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === commOId && user.commAuth >= AUTH_SILVER)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {community} = await this.communityDBService.readCommunityByCommOId(where, commOId)
      if (!community) {
        throw {
          gkd: {communityErr: `공동체가 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_COMMUNITY',
          gkdErrMsg: `공동체가 존재하지 않음`,
          gkdStatus: {commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
