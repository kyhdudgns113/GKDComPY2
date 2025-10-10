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
