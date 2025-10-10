import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'
import {JwtPayloadType} from '@type'
import {COMM_NAME_LENGTH_MAX} from '@shareValue'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class AdminCommPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // POST AREA:

  /**
   * addCommunity
   * - 공동체체 생성 함수
   *
   * 입력값
   * - commName: string
   *     + 새로 만들 공동체의 이름
   *
   * 출력값
   * - commArr: T.CommunityType[]
   *     + 전체 공동체들의 배열(이름순으로 정리)
   *
   * 작동 순서
   * 0. 권한 췍!!
   * 1. 이름 길이 췍!!
   * 2. 공동체 생성 뙇!!
   * 3. 공동체 배열 읽기 뙇!!
   * 4. 이름순으로 정렬 뙇!!
   * 5. 반환 뙇!!
   */
  async addCommunity(jwtPayload: JwtPayloadType, data: HTTP.AddCommunityDataType) {
    const where = `/admin/community/addCommunity`
    const {commName} = data

    try {
      // 0. 권한 췍!!
      await this.dbHubService.checkUserAdmin(where, jwtPayload)

      // 1. 이름 길이 췍!!
      if (commName.trim().length < 1 || commName.length > COMM_NAME_LENGTH_MAX) {
        throw {
          gkd: {commName: `이름 길이 오류`},
          gkdErrCode: 'ADMIN_COMM_ADD_NAME_LENGTH_ERROR',
          gkdErrMsg: `이름 길이 오류. 공백만 있거나 비어있으면 안되고, ${COMM_NAME_LENGTH_MAX}자 이하여야 합니다.`,
          gkdStatus: {commName, length: commName.length},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 2. 공동체 생성 뙇!!
      const dto: DTO.CreateCommunityAdminDTO = {commName}
      await this.dbHubService.createCommunity(where, dto)

      // 3. 공동체 배열 읽기 뙇!!
      const {commArr} = await this.dbHubService.readCommunityArr(where)

      // 4. 이름순으로 정렬 뙇!!
      commArr.sort((a, b) => a.commName.localeCompare(b.commName))

      // 5. 반환 뙇!!
      return {commArr}
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
   * - community: T.CommunityType
   *     + 생성된 공동체 정보
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 유저 생성 뙇!!
   * 3. 공동체 읽기 뙇!!
   * 4. 반환 뙇!!
   */
  async addCommUser(jwtPayload: JwtPayloadType, data: HTTP.AddCommUserDataType) {
    const where = `/admin/community/addCommUser`
    const {commOId, userId, password} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkUserAdmin(where, jwtPayload)

      // 2. 유저 생성 뙇!!
      const dto: DTO.CreateUserDTO = {commOId, userId, password}
      await this.dbHubService.createUser(where, dto)

      // 3. 공동체 읽기 뙇!!
      const {community} = await this.dbHubService.readCommunityByCommOId(where, commOId)

      // 4. 반환 뙇!!
      return {community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
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
   *     + 수정할 유저의 권한
   *
   * 출력값
   * - user: T.UserType
   *     + 수정된 유저 정보
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 유저 수정 뙇!!
   * 3. 유저 읽기 뙇!!
   * 4. 반환 뙇!!
   */
  async modifyCommUser(jwtPayload: JwtPayloadType, data: HTTP.ModifyCommUserDataType) {
    const where = `/admin/community/modifyCommUser`
    const {userOId, newUserId, newPassword, newCommAuth} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkUserAdmin(where, jwtPayload)

      // 2. 유저 수정 뙇!!
      const dto: DTO.UpdateUserDTO = {userOId, newUserId, newPassword, newCommAuth}
      await this.dbHubService.updateUser(where, dto)

      // 3. 유저 읽기 뙇!!
      const {user} = await this.dbHubService.readUserByUserOId(where, userOId)

      // 4. 반환 뙇!!
      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // GET AREA:

  /**
   * loadCommArr
   * - 공동체 배열 읽기 함수
   *
   * 입력값
   * - 없음
   *
   * 출력값
   * - commArr: T.CommunityType[]
   *     + 전체 공동체들의 배열(이름순으로 정리)
   *
   * 작동 순서
   * 0. 권한 췍!!
   * 1. 공동체 배열 읽기 뙇!!
   * 2. 이름순으로 정렬 뙇!!
   * 3. 반환 뙇!!
   */
  async loadCommArr(jwtPayload: JwtPayloadType) {
    const where = `/admin/community/loadCommArr`
    try {
      // 0. 권한 췍!!
      await this.dbHubService.checkUserAdmin(where, jwtPayload)

      // 1. 공동체 배열 읽기 뙇!!
      const {commArr} = await this.dbHubService.readCommunityArr(where)

      // 2. 이름순으로 정렬 뙇!!
      commArr.sort((a, b) => a.commName.localeCompare(b.commName))

      // 3. 반환 뙇!!
      return {commArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  /**
   * loadCommUserArr
   * - 공동체 유저 배열 읽기 함수
   *
   * 입력값
   * - commOId: string
   *     + 공동체의 OId
   *
   * 출력값
   * - commUserArr: T.UserType[]
   *     + 공동체에 속한 유저들의 배열(이름순으로 정리)
   *
   * 작동 순서
   * 0. 권한 췍!!
   * 1. 공동체 유저 배열 읽기 뙇!!
   * 2. 이름순으로 정렬 뙇!!
   * 3. 반환 뙇!!
   */
  async loadCommUserArr(jwtPayload: JwtPayloadType, commOId: string) {
    const where = `/admin/community/loadCommUserArr/${commOId}`
    try {
      // 0. 권한 췍!!
      await this.dbHubService.checkUserAdmin(where, jwtPayload)

      // 1. 공동체 유저 배열 읽기 뙇!!
      const {userArr} = await this.dbHubService.readUserArrByCommOId(where, commOId)

      // 2. 이름순으로 정렬 뙇!!
      userArr.sort((a, b) => a.userId.localeCompare(b.userId))

      // 3. 반환 뙇!!
      return {userArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
