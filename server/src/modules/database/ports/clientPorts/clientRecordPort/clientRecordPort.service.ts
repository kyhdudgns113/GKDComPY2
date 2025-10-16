import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as T from '@type'

@Injectable()
export class ClientRecordPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // GET AREA:

  /**
   * loadClubWeekRowArr
   * - 클럽의 주간 기록 행 배열을 불러오는 함수
   *
   * 입력값
   * - clubOId: string
   *     + 클럽의 OId
   *
   * 출력값
   * - weekRowArr: T.WeekRowType[]
   *     + 주간 기록 행 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. clubOId로 주간 기록 행 배열 조회 뙇!!
   * 3. 리턴 뙇!!
   */
  async loadClubWeekRowArr(jwtPayload: T.JwtPayloadType, clubOId: string) {
    const where = `/client/record/loadClubWeekRowArr`

    try {
      // 1. 권한 체크: clubOId에 대한 읽기 권한이 있는지 확인
      const {user, club} = await this.dbHubService.checkAuth_ClubRead(where, jwtPayload, clubOId)

      // 2. clubOId로 주간 기록 행 배열 조회
      const {weekRowArr} = await this.dbHubService.readWeekRowArrByClubOId(where, clubOId)

      // 3. 리턴 뙇!!
      return {weekRowArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
