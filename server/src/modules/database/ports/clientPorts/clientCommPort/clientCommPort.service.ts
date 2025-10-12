import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientCommPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // POST AREA:

  /**
   * addCommUser
   * - 공동체 유저 생성 함수
   *
   * 입력값
   * - commOId: string
   *     + 공동체의 OId
   * - userId: string
   *     + 새로 만들 유저의 ID
   * - password: string
   *     + 새로 만들 유저의 비밀번호
   *
   * 출력값
   * - userArr: T.UserType[]
   *     + 갱신된 공동체 유저들의 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 유저 생성 뙇!!
   * 3. 공동체 유저 배열 읽기 뙇!!
   * 4. 리턴턴 뙇!!
   */
  async addCommUser(jwtPayload: T.JwtPayloadType, data: HTTP.AddCommUserDataType) {
    const where = `/client/community/addCommUser`
    const {commOId, userId, password} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_CommWrite(where, jwtPayload, commOId)

      // 2. 유저 생성 뙇!!
      const dto: DTO.CreateUserDTO = {commOId, userId, password}
      await this.dbHubService.createUser(where, dto)

      // 3. 공동체 유저 배열 읽기 뙇!!
      const {userArr} = await this.dbHubService.readUserArrByCommOId(where, commOId)

      // 4. 리턴턴 뙇!!
      return {userArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    }
  }

  // GET AREA:

  /**
   * loadUsersCommunity
   * - 공동체 유저 배열 읽기 함수
   *
   * 출력값
   * - clubArr: T.ClubType[]
   *     + 공동체에 속한 클럽들의 배열
   * - community: T.CommunityType
   *     + 공동체 정보
   * - userArr: T.UserType[]
   *     + 공동체에 속한 유저들의 배열
   *
   * 작동 순서
   * 1. 권한 췍!! (유저정보 가져오기)
   * 2. 공동체 정보 뙇!!
   * 3. 클럽 배열 뙇!!
   * 4. 유저 배열 뙇!!
   * 5. 리턴 뙇!!
   */
  async loadUsersCommunity(jwtPayload: T.JwtPayloadType) {
    const where = `/client/community/loadUsersCommunity`
    try {
      // 1. 권한 췍!! (유저정보 가져오기)
      const {user} = await this.dbHubService.checkUserNormal(where, jwtPayload)
      const {commOId} = user

      // 2. 공동체 정보 뙇!!
      const {community} = await this.dbHubService.readCommunityByCommOId(where, commOId)

      // 3. 클럽 배열 뙇!!
      const {clubArr} = await this.dbHubService.readClubArrByCommOId(where, commOId)

      // 4. 유저 배열 뙇!!
      const {userArr} = await this.dbHubService.readUserArrByCommOId(where, commOId)

      // 5. 리턴 뙇!!
      return {clubArr, community, userArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    }
  }
}
