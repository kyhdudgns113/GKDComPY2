import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientMemberPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // GET AREA:

  async loadClubMemberArr(jwtPayload: T.JwtPayloadType, clubOId: string) {
    const where = `/client/member/loadClubMemberArr`

    try {
      // 1. 권한 체크: clubOId에 대한 읽기 권한이 있는지 확인
      const {user, club} = await this.dbHubService.checkAuth_ClubRead(where, jwtPayload, clubOId)

      // 2. clubOId로 멤버 배열 조회
      const {clubMemberArr} = await this.dbHubService.readClubMemberArrByClubOId(where, clubOId)

      return {clubMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
