import {Injectable} from '@nestjs/common'

import * as DTO from '@dto'
import * as T from '@type'
import * as TB from '../_tables'

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

  // AREA1: Community Area

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
}
