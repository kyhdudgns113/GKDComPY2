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
