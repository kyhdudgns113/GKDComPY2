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

      // 4. 공동체 멤버 배열 읽기 뙇!!
      const {commMemberArr} = await this.dbHubService.readCommMemberArrByCommOId(where, commOId)

      // 5. 리턴 뙇!!
      return {clubMemberArr, commMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // PUT AREA:

  /**
   * modifyMemberCard
   * - 멤버 카드 수정 함수
   *
   * 입력값
   * - memOId: string
   *     + 멤버의 OId
   * - posIdx: number
   *     + 멤버의 포지션
   * - cardName: string
   *     + 멤버의 카드 이름
   * - cardNumber: number | null
   *     + 멤버의 카드 번호
   * - skillIdxs: number[]
   *     + 멤버의 스킬 인덱스
   * - skillLevels: number[]
   *     + 멤버의 스킬 레벨
   *
   * 출력값
   * - memberDeck: T.MemberType[]
   *     + 멤버의 카드 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 멤버 존재하는지 뙇!!
   * 3. 멤버 카드 수정 뙇!!
   * 4. 멤버 카드 배열 읽기 뙇!!
   * 5. 리턴 뙇!!
   */
  async modifyMemberCard(jwtPayload: T.JwtPayloadType, data: HTTP.ModifyMemberCardDataType) {
    const where = `/client/member/modifyMemberCard`
    const {memOId, posIdx, cardName, cardNumber, skillIdxs, skillLevels} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_MemberWrite(where, jwtPayload, memOId)

      // 2. 멤버 존재하는지 뙇!!
      const {member} = await this.dbHubService.readClubMemberByMemOId(where, memOId)
      if (!member) {
        throw {
          gkd: {memberErr: `멤버OId 의 멤버가 존재하지 않음`},
          gkdErrCode: 'DBHUB_MODIFY_MEMBER_CARD_NO_MEMBER',
          gkdErrMsg: `멤버OId 의 멤버가 존재하지 않음`,
          gkdStatus: {memOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 3. 멤버 카드 수정 뙇!!
      const dto: DTO.UpdateMemberCardDTO = {memOId, posIdx, cardName, cardNumber, skillIdxs, skillLevels}
      await this.dbHubService.updateMemberCard(where, dto)

      // 4. 멤버 카드 배열 읽기 뙇!!
      const {cardArr: memberDeck} = await this.dbHubService.readMemberCardArrByMemOId(where, memOId)

      // 5. 리턴 뙇!!
      return {memberDeck}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  /**
   * moveClubMember
   * - 멤버를 다른 클럽으로 이동시키는 함수
   *
   * 입력값
   * - clubOId: string
   *     + 새로운 클럽의 OId (이동할 목적지)
   * - memOId: string
   *     + 이동할 멤버의 OId
   *
   * 출력값
   * - clubMemberArr: T.MemberType[]
   *     + 새로운 클럽의 멤버들 배열
   *
   * 작동 순서
   * 1. 멤버 존재하는지 뙇!!
   * 2. 기존 클럽에 대한 쓰기 권한 췍!! (멤버를 빼는 권한)
   * 3. 새로운 클럽에 대한 쓰기 권한 췍!! (멤버를 받는 권한)
   * 4. 멤버의 clubOId 업데이트 뙇!!
   * 5. 기존 클럽의 갱신된 멤버 배열 읽기 뙇!!
   * 6. 리턴 뙇!!
   */
  async moveClubMember(jwtPayload: T.JwtPayloadType, data: HTTP.MoveClubMemberDataType) {
    const where = `/client/member/moveClubMember`
    const {prevClubOId, clubOId, memOId} = data

    try {
      // 1. 멤버 존재하는지 뙇!!
      const {member} = await this.dbHubService.readClubMemberByMemOId(where, memOId)
      if (!member) {
        throw {
          gkd: {memberErr: `멤버OId 의 멤버가 존재하지 않음`},
          gkdErrCode: 'DBHUB_MOVE_CLUB_MEMBER_NO_MEMBER',
          gkdErrMsg: `멤버OId 의 멤버가 존재하지 않음`,
          gkdStatus: {memOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const oldClubOId = member.clubOId

      // 2. 기존 클럽에 대한 쓰기 권한 췍!! (멤버를 빼는 권한)
      await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, oldClubOId)

      // 3. 새로운 클럽에 대한 쓰기 권한 췍!! (멤버를 받는 권한)
      await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, clubOId)

      // 4. 멤버의 clubOId 업데이트 뙇!!
      const dto: DTO.UpdateMemberClubOIdDTO = {memOId, newClubOId: clubOId}
      await this.dbHubService.updateMemberClubOId(where, dto)

      // 5. 기존 클럽의 갱신된 멤버 배열 읽기 뙇!!
      const {clubMemberArr} = await this.dbHubService.readClubMemberArrByClubOId(where, prevClubOId)

      // 6. 리턴 뙇!!
      return {clubMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

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

  /**
   * saveEMembers
   * - 전체 멤버 페이지의 멤버 정보를 저장하는 함수
   *
   * 입력값
   * - commOId: string
   *     + 공동체의 OId
   * - eMemberArr: T.EMemberType[]
   *     + 저장할 전체 멤버 배열
   *
   * 출력값
   * - success: boolean
   *     + 저장 성공 여부
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. eMembers 저장 뙇!!
   * 3. 리턴 뙇!!
   */
  async saveEMembers(jwtPayload: T.JwtPayloadType, data: HTTP.SaveEMembersDataType) {
    const where = `/client/member/saveEMembers`
    const {commOId, eMemberArr} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_CommWrite(where, jwtPayload, commOId)

      // 2. eMembers 저장 뙇!!
      await this.dbHubService.createOrUpdateEMembers(where, commOId, eMemberArr)

      // 3. 리턴 뙇!!
      return {success: true}
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

  /**
   * loadMemberDeck
   * - 멤버의 카드 배열을 불러오는 함수
   *
   * 입력값
   * - memOId: string
   *     + 멤버의 OId
   *
   * 출력값
   * - memberDeck: T.CardType[]
   *     + 멤버의 카드 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 멤버 카드 배열 읽기 뙇!!
   * 3. 리턴 뙇!!
   */
  async loadMemberDeck(jwtPayload: T.JwtPayloadType, memOId: string) {
    const where = `/client/member/loadMemberDeck`

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_MemberRead(where, jwtPayload, memOId)

      // 2. 멤버 카드 배열 읽기 뙇!!
      const {cardArr: memberDeck} = await this.dbHubService.readMemberCardArrByMemOId(where, memOId)

      // 3. 리턴 뙇!!
      return {memberDeck}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  /**
   * loadEMembers
   * - 전체 멤버 페이지의 멤버 정보를 불러오는 함수
   *
   * 입력값
   * - commOId: string
   *     + 공동체의 OId
   *
   * 출력값
   * - eMembers: {[clubOId: string]: T.EMemberType[]}
   *     + 클럽별로 그룹화된 전체 멤버 객체
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. eMembers 읽기 뙇!!
   * 3. 리턴 뙇!!
   */
  async loadEMembers(jwtPayload: T.JwtPayloadType, commOId: string) {
    const where = `/client/member/loadEMembers`

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_CommRead(where, jwtPayload, commOId)

      // 2. eMembers 읽기 뙇!!
      const {eMembers} = await this.dbHubService.readEMemberArrByCommOId(where, commOId)

      // 3. 리턴 뙇!!
      return {eMembers}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // DELETE AREA:

  /**
   * removeClubMember
   * - 클럽 멤버 삭제 함수
   *
   * 입력값
   * - clubOId: string
   *     + 클럽의 OId
   * - memOId: string
   *     + 멤버의 OId
   *
   * 출력값
   * - clubMemberArr: T.MemberType[]
   *     + 클럽 멤버들의 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 멤버 존재하는지 뙇!!
   * 3. 멤버 삭제 뙇!!
   * 4. 클럽 멤버 배열 읽기 뙇!!
   * 5. 리턴 뙇!!
   */
  async removeClubMember(jwtPayload: T.JwtPayloadType, clubOId: string, memOId: string) {
    const where = `/client/member/removeClubMember`

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, clubOId)

      // 2. 멤버 존재하는지 뙇!!
      const {member} = await this.dbHubService.readClubMemberByMemOId(where, memOId)
      if (!member) {
        throw {
          gkd: {memberErr: `멤버OId 의 멤버가 존재하지 않음`},
          gkdErrCode: 'DBHUB_REMOVE_CLUB_MEMBER_NO_MEMBER',
          gkdErrMsg: `멤버OId 의 멤버가 존재하지 않음`,
          gkdStatus: {clubOId, memOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 3. 멤버 삭제 뙇!!
      await this.dbHubService.deleteClubMember(where, memOId)

      // 4. 클럽 멤버 배열 읽기 뙇!!
      const {clubMemberArr} = await this.dbHubService.readClubMemberArrByClubOId(where, clubOId)

      // 5. 리턴 뙇!!
      return {clubMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    }
  }
}
