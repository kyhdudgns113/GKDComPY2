import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientCommPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  /**
   * loadCommunity
   * - 공동체 정보 읽기 함수
   *
   * 입력값
   * - jwtPayload: T.JwtPayloadType
   *     + 쿠키에서 읽은 JWT 토큰의 페이로드
   * - commOId: string
   *     + 공동체의 OId
   *
   * 출력값
   * - community: T.CommunityType
   *     + 공동체 정보
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 공동체 정보 읽기 뙇!!
   * 3. 반환 뙇!!
   */
  async loadCommunity(jwtPayload: T.JwtPayloadType, commOId: string) {
    const where = `/client/community/loadCommunity`

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_CommRead(where, jwtPayload, commOId)

      // 2. 공동체 정보 읽기 뙇!!
      const {community} = await this.dbHubService.readCommunityByCommOId(where, commOId)

      if (!community) {
        throw {
          gkd: {communityErr: `공동체가 존재하지 않음`},
          gkdErrCode: 'ClientCommPort_loadCommunity_NoCommunity',
          gkdErrMsg: `공동체가 존재하지 않음`,
          gkdStatus: {commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 3. 반환 뙇!!
      return {community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
