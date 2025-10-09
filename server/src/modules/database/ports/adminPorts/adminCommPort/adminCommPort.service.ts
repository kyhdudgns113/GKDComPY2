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
   * 0. (생략) 권한 췍!!
   *     + Guard 에서 알아서 체크한다.
   * 1. 이름 길이 췍!!
   * 2. 공동체 생성 뙇!!
   * 3. 공동체 배열 읽기 뙇!!
   * 4. 반환 뙇!!
   */
  async addCommunity(jwtPayload: JwtPayloadType, data: HTTP.AddCommunityDataType) {
    const where = `/admin/community/addCommunity`
    const {commName} = data

    try {
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

      // 4. 반환 뙇!!
      return {commArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // GET AREA:

  async loadCommArr(jwtPayload: JwtPayloadType) {
    const where = `/admin/community/loadCommArr`
    try {
      const {commArr} = await this.dbHubService.readCommunityArr(where)
      return {commArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
