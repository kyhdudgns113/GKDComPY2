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
   * addCommClub
   * - 공동체 클럽 생성 함수
   *
   * 입력값
   * - commOId: string
   *     + 공동체의 OId
   * - clubName: string
   *     + 새로 만들 클럽의 이름
   *
   * 출력값
   * - clubArr: T.ClubType[]
   *     + 생성된 이후 공동체에 속한 클럽들의 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 공동체에 현재 속한 클럽들의 개수 췍!!
   * 3. 클럽 생성 뙇!!
   * 4. 공동체에 속한 클럽 배열 읽기 뙇!!
   * 5. 반환 뙇!!
   */
  async addCommClub(jwtPayload: T.JwtPayloadType, data: HTTP.AddCommClubDataType) {
    const where = `/client/community/addCommClub`
    const {commOId, clubName} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_CommWrite(where, jwtPayload, commOId)

      // 2. 공동체에 현재 속한 클럽들의 개수 췍!!
      const {clubArr: prevArr} = await this.dbHubService.readClubArrByCommOId(where, commOId)
      const clubIdx = prevArr.length

      // 3. 클럽 생성 뙇!!
      const dto: DTO.CreateClubDTO = {commOId, clubName, clubIdx}
      await this.dbHubService.createClub(where, dto)

      // 4. 공동체에 속한 클럽 배열 읽기 뙇!!
      const {clubArr} = await this.dbHubService.readClubArrByCommOId(where, commOId)

      // 5. 반환 뙇!!
      return {clubArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

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

  // PUT AREA:

  /**
   * modifyCommUser
   * - 공동체 유저 수정 함수
   *
   * 입력값
   * - userOId: string
   *     + 수정할 유저의 OId
   * - newUserId: string
   *     + 유저의 새로운 ID
   * - newPassword: string
   *     + 유저의 새로운 비밀번호
   * - newCommAuth: number
   *     + 유저의 새로운 권한값
   */
  async modifyCommUser(jwtPayload: T.JwtPayloadType, data: HTTP.ModifyCommUserDataType) {
    const where = `/client/community/modifyCommUser`
    const {userOId, newUserId, newPassword, newCommAuth} = data

    try {
      // 1. 권한 췍!!
      const {targetUserCommunity: community} = await this.dbHubService.checkAuth_UserWrite(where, jwtPayload, userOId)

      // 2. 유저 수정 뙇!!
      const dto: DTO.UpdateUserDTO = {userOId, newUserId, newPassword, newCommAuth}
      await this.dbHubService.updateUser(where, dto)

      // 3. 공동체 유저 배열 읽기 뙇!!
      const {userArr} = await this.dbHubService.readUserArrByCommOId(where, community.commOId)

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
