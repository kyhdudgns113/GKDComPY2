import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientCommPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  /**
   * loadUsersCommunity
   * - 공동체 유저 배열 읽기 함수
   *
   * 입력값
   * - jwtPayload: T.JwtPayloadType
   *     + 쿠키에서 읽은 JWT 토큰의 페이로드
   *
   * 출력값
   * - community: T.CommunityType
   *     + 공동체 정보
   *
   * 작동 순서
   * 1. 권한 췍!! (유저정보 가져오기)
   * 2. 공동체 정보 뙇!!
   * 3. 리턴 뙇!!
   */
  async loadUsersCommunity(jwtPayload: T.JwtPayloadType) {
    const where = `/client/community/loadUsersCommunity`
    try {
      // 1. 권한 췍!! (유저정보 가져오기)
      const {user} = await this.dbHubService.checkUserNormal(where, jwtPayload)
      const {commOId} = user

      // 2. 공동체 정보 뙇!!
      const {community} = await this.dbHubService.readCommunityByCommOId(where, commOId)

      // 3. 리턴 뙇!!
      return {community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    }
  }
}
