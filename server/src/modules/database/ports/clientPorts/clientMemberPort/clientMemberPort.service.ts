import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientMemberPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // POST AREA:

  /**
   * addClubMember
   * - 클럽 멤버 추가 함수
   *
   * 입력값
   * - clubOId: string
   *     + 클럽의 OId
   * - memName: string
   *     + 멤버의 이름
   * - batterPower: number
   *     + 멤버의 타자력
   * - pitcherPower: number
   *     + 멤버의 투수력
   *
   * 출력값
   * - clubMemberArr: T.MemberType[]
   *     + 클럽 멤버들의 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 멤버 추가 뙇!!
   * 3. 클럽 멤버 배열 읽기 뙇!!
   * 4. 리턴 뙇!!
   */
  async addClubMember(jwtPayload: T.JwtPayloadType, data: HTTP.AddClubMemberDataType) {
    const where = `/client/member/addClubMember`
    const {commOId, clubOId, memName, batterPower, pitcherPower} = data

    try {
      // 1. 권한 췍!!
      const {user, club} = await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, clubOId)

      // 2. 멤버 추가 뙇!!
      const dto: DTO.CreateClubMemberDTO = {commOId, clubOId, memName, batterPower, pitcherPower}
      await this.dbHubService.createClubMember(where, dto)

      // 3. 클럽 멤버 배열 읽기 뙇!!
      const {clubMemberArr} = await this.dbHubService.readClubMemberArrByClubOId(where, clubOId)

      // 4. 리턴 뙇!!
      return {clubMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // PUT AREA:

  /**
   * saveClubMemberInfo
   * - 클럽 멤버 정보 저장 함수
   *
   * 입력값
   * - memOId: string
   *     + 멤버의 OId
   * - memName: string
   *     + 멤버의 이름
   * - batterPower: number
   *     + 멤버의 타자력
   * - pitcherPower: number
   *     + 멤버의 투수력
   * - memberComment: string
   *     + 멤버의 코멘트
   * - position: number
   *     + 멤버의 포지션
   *
   * 출력값
   * - clubArr: T.MemberType[]
   *     + 클럽 멤버들의 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 멤버 존재하는지 뙇!!
   * 3. 멤버 정보 저장 뙇!!
   * 4. 클럽 멤버 배열 읽기 뙇!!
   * 5. 리턴 뙇!!
   */
  async saveClubMemberInfo(jwtPayload: T.JwtPayloadType, data: HTTP.SaveClubMemberInfoDataType) {
    const where = `/client/member/saveClubMemberInfo`
    const {clubOId, memOId, memName, batterPower, pitcherPower, memberComment, position} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, clubOId)

      // 2. 멤버 존재하는지 뙇!!
      const {member} = await this.dbHubService.readClubMemberByMemOId(where, memOId)
      if (!member) {
        throw {
          gkd: {memberErr: `멤버OId 의 멤버가 존재하지 않음`},
          gkdErrCode: 'DBHUB_SAVE_CLUB_MEMBER_INFO_NO_MEMBER',
          gkdErrMsg: `멤버OId 의 멤버가 존재하지 않음`,
          gkdStatus: {memOId, memName},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 3. 멤버 정보 저장 뙇!!
      const dto: DTO.UpdateMemberInfoDTO = {memOId, memName, batterPower, pitcherPower, memberComment, position}
      await this.dbHubService.updateClubMemberInfo(where, dto)

      // 4. 클럽 멤버 배열 읽기 뙇!!
      const {clubMemberArr} = await this.dbHubService.readClubMemberArrByClubOId(where, clubOId)

      // 5. 리턴 뙇!!
      return {clubMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

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
