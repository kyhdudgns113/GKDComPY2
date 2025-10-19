import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'
import * as U from '@util'
import * as V from '@value'

@Injectable()
export class ClientRecordPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // POST AREA:

  /**
   * addNextWeek
   * - 다음 주간 기록 추가 함수
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
   * 2. 클럽 주차 배열 뙇!!
   * 3. 새로운 주차의 날짜 뙇!!
   *     - 클럽 주차 배열 원소 유무에 따라 결정
   * 4. 너무 먼 미래를 생성하려는지 췍!!
   * 5. 새로운 주차 생성 뙇!!
   * 6. 갱신된 클럽 주차 배열 뙇!!
   * 7. 리턴 뙇!!
   */
  async addNextWeek(jwtPayload: T.JwtPayloadType, data: HTTP.AddNextWeekDataType) {
    const where = `/client/record/addNextWeek`
    const {clubOId} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, clubOId)

      // 2. 클럽 주차 배열 뙇!!
      const {weekRowArr: prevArr} = await this.dbHubService.readWeekRowArrByClubOId(where, clubOId)

      // 3. 새로운 주차의 날짜 뙇!!
      let startDateVal = 0
      let endDateVal = 0

      if (prevArr.length === 0) {
        startDateVal = U.getStartValue()
        endDateVal = U.getEndValue()
      } // ::
      else {
        startDateVal = U.shiftDateValue(prevArr[0].startDateVal, 7)
        endDateVal = U.shiftDateValue(prevArr[0].endDateVal, 7)
      }

      // 4. 너무 먼 미래를 생성하려는지 췍!!
      const todayValue = U.getTodayValue()
      const after2week = U.shiftDateValue(todayValue, 14)

      if (startDateVal > after2week) {
        throw {
          gkd: {limit: `주차 생성 가능 기간이 초과되었습니다.`},
          gkdErrCode: 'CLIENTRECORDPORT_ADD_NEXT_WEEK_LIMIT',
          gkdErrMsg: `주차 생성 가능 기간이 초과되었습니다.`,
          gkdStatus: {clubOId, maxDate: after2week},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 5. 새로운 주차 생성 뙇!!
      const dto: DTO.CreateWeekRowDTO = {
        clubOId,
        startDateVal,
        endDateVal,
        isNext: true,
        title: startDateVal.toString()
      }
      await this.dbHubService.createWeekRow(where, dto)

      // 6. 갱신된 클럽 주차 배열 뙇!!
      const {weekRowArr} = await this.dbHubService.readWeekRowArrByClubOId(where, clubOId)

      // 7. 리턴 뙇!!
      return {weekRowArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  /**
   * addPrevWeek
   * - 이전 주간 기록 추가 함수
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
   * 2. 클럽의 이전 주차 생성 정보 조회 뙇!!
   * 3. 클럽의 주차 배열 뙇!!
   * 4. 새로운 주차의 날짜 뙇!!
   * 5. 새로운 주차 생성 뙇!!
   * 6. 클럽의 이전 주차 생성 정보 갱신 뙇!!
   * 7. 갱신된 클럽 주차 배열 뙇!!
   * 8. 리턴 뙇!!
   */
  async addPrevWeek(jwtPayload: T.JwtPayloadType, data: HTTP.AddPrevWeekDataType) {
    const where = `/client/record/addPrevWeek`
    const {clubOId} = data
    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, clubOId)

      // 2. 클럽의 이전 주차 생성 정보 조회 뙇!!
      const {lastAddPrevWeekDate, numOfAddedPrevWeek} = await this.dbHubService.readClubWeekInfo(where, clubOId)

      const todayValue = U.getTodayValue()

      // 2-1. 하루 생성 갯수 초과했으면 에러 뙇!!
      if (lastAddPrevWeekDate === todayValue && numOfAddedPrevWeek >= V.MAX_ADD_PREV_WEEK_PER_DAY) {
        throw {
          gkd: {limit: `하루에 ${V.MAX_ADD_PREV_WEEK_PER_DAY}개 이상의 이전 주차를 추가할 수 없습니다.`},
          gkdErrCode: 'CLIENTRECORDPORT_ADD_PREV_WEEK_LIMIT',
          gkdErrMsg: `하루에 ${V.MAX_ADD_PREV_WEEK_PER_DAY}개 이상의 이전 주차를 추가할 수 없습니다.`,
          gkdStatus: {clubOId, maxNum: V.MAX_ADD_PREV_WEEK_PER_DAY},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 3. 클럽의 주차 배열 뙇!!
      const {weekRowArr: prevArr} = await this.dbHubService.readWeekRowArrByClubOId(where, clubOId)

      // 4. 새로운 주차의 날짜 뙇!!
      let startDateVal = 0
      let endDateVal = 0
      const arrLen = prevArr.length

      if (arrLen === 0) {
        startDateVal = U.getStartValue()
        endDateVal = U.getEndValue()
      } // ::
      else {
        startDateVal = U.shiftDateValue(prevArr[arrLen - 1].startDateVal, -7)
        endDateVal = U.shiftDateValue(prevArr[arrLen - 1].endDateVal, -7)
      }

      // 5. 새로운 주차 생성 뙇!!
      const dto: DTO.CreateWeekRowDTO = {
        clubOId,
        startDateVal,
        endDateVal,
        isNext: false,
        title: startDateVal.toString()
      }
      await this.dbHubService.createWeekRow(where, dto)

      // 6. 클럽의 이전 주차 생성 정보 갱신 뙇!!
      if (todayValue !== lastAddPrevWeekDate) {
        await this.dbHubService.updateClubWeekInfo(where, clubOId, todayValue, 1)
      } // ::
      else {
        await this.dbHubService.updateClubWeekInfo(where, clubOId, todayValue, numOfAddedPrevWeek + 1)
      }

      // 7. 갱신된 클럽 주차 배열 뙇!!
      const {weekRowArr} = await this.dbHubService.readWeekRowArrByClubOId(where, clubOId)

      // 8. 리턴 뙇!!
      return {weekRowArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

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

  /**
   * loadWeeklyRecordInfo
   * - 주간 기록 정보를 불러오는 함수
   *
   * 입력값
   * - weekOId: string
   *     + 주간 기록의 OId
   *
   * 출력값
   * - dailyRecordArr: T.DailyRecordType[]
   *     + 일일 기록 배열
   * - dateInfoArr: T.RecordDateInfo[]
   *     + 날짜 정보 배열
   * - rowMemberArr: T.RowMemberType[]
   *     + 행 멤버 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. weekOId로 일일 기록 배열 조회 뙇!!
   * 3. weekOId로 날짜 정보 배열 조회 뙇!!
   * 4. weekOId로 행 멤버 배열 조회 뙇!!
   * 5. 리턴 뙇!!
   */
  async loadWeeklyRecordInfo(jwtPayload: T.JwtPayloadType, weekOId: string) {
    const where = `/client/record/loadWeeklyRecordInfo`

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_RecordRead(where, jwtPayload, weekOId)

      // 2. weekOId로 일일 기록 배열 조회 뙇!!
      const {dailyRecordArr} = await this.dbHubService.readDailyRecordArrByWeekOId(where, weekOId)

      // 3. weekOId로 날짜 정보 배열 조회 뙇!!
      const {dateInfoArr} = await this.dbHubService.readDateInfoArrByWeekOId(where, weekOId)

      // 4. weekOId로 행 멤버 배열 조회 뙇!!
      const {rowMemberArr} = await this.dbHubService.readRowMemberArrByWeekOId(where, weekOId)

      // 5. 리턴 뙇!!
      return {dailyRecordArr, dateInfoArr, rowMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // PUT AREA:

  /**
   * modifyDailyInfo
   * - 일간 정보를 수정하는 함수
   *
   * 입력값
   * - weekOId: string
   *     + 주간 기록의 OId
   * - dateVal: number
   *     + 날짜 값
   * - enemyName: string
   *     + 상대 클럽명
   * - pitchOrder: number
   *     + 선발 순서
   * - dailyOrder: string
   *     + 클전 오더
   * - comments: string
   *     + 일간 코멘트
   *
   * 출력값
   * - dateInfoArr: T.RecordDateInfo[]
   *     + 수정된 날짜 정보 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 일간 정보 수정 뙇!!
   * 3. 수정된 날짜 정보 배열 조회 뙇!!
   * 4. 리턴 뙇!!
   */
  async modifyDailyInfo(jwtPayload: T.JwtPayloadType, data: HTTP.ModifyDailyInfoDataType) {
    const where = `/client/record/modifyDailyInfo`
    const {weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments} = data

    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_RecordWrite(where, jwtPayload, weekOId)

      // 2. 일간 정보 수정 뙇!!
      const dto: DTO.UpdateDateInfoDTO = {
        weekOId,
        dateVal,
        enemyName,
        pitchOrder,
        dailyOrder,
        comments
      }
      await this.dbHubService.updateDateInfo(where, dto)

      // 3. 수정된 날짜 정보 배열 조회 뙇!!
      const {dateInfoArr} = await this.dbHubService.readDateInfoArrByWeekOId(where, weekOId)

      // 4. 리턴 뙇!!
      return {dateInfoArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  /**
   * modifyWeeklyInfo
   * - 주간 정보를 수정하는 함수
   *
   * 입력값
   * - weekOId: string
   *     + 주간 기록의 OId
   * - weekComments: string
   *     + 주간 코멘트
   *
   * 출력값
   * - weekRowArr: T.WeekRowType[]
   *     + 수정된 주간 기록 행 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 주간 코멘트 수정 뙇!!
   * 3. 클럽 OId 조회 뙇!!
   * 4. 수정된 주간 기록 행 배열 조회 뙇!!
   * 5. 리턴 뙇!!
   */
  async modifyWeeklyInfo(jwtPayload: T.JwtPayloadType, data: HTTP.ModifyWeeklyInfoDataType) {
    const where = `/client/record/modifyWeeklyInfo`
    const {weekOId, weekComments} = data

    try {
      // 1. 권한 췍!!
      const {weekRow} = await this.dbHubService.checkAuth_RecordWrite(where, jwtPayload, weekOId)

      // 2. 주간 정보 수정 뙇!!
      const dto: DTO.UpdateWeeklyInfoDTO = {
        weekOId,
        weekComments
      }
      await this.dbHubService.updateWeeklyInfo(where, dto)

      // 3. 수정된 주간 기록 행 배열 조회 뙇!!
      const {weekRowArr} = await this.dbHubService.readWeekRowArrByClubOId(where, weekRow.clubOId)

      // 4. 리턴 뙇!!
      return {weekRowArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // DELETE AREA:

  /**
   * deleteWeeklyRecord
   * - 주간 기록을 삭제하는 함수
   *
   * 입력값
   * - weekOId: string
   *     + 주간 기록의 OId
   *
   * 출력값
   * - weekRowArr: T.WeekRowType[]
   *     + 주간 기록 행 배열
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 클럽의 주차 배열 조히 뙇!!
   * 3. 처음이나 마지막이 아니면 에러 뙇!!
   * 4. 주간 기록 삭제 뙇!!
   * 5. 갱신된 클럽의 주차 배열 뙇!!
   * 6. 리턴 뙇!!
   */
  async removeWeekRow(jwtPayload: T.JwtPayloadType, weekOId: string) {
    const where = `/client/record/deleteWeeklyRecord`

    try {
      // 1. 권한 췍!!
      const {weekRow, club} = await this.dbHubService.checkAuth_RecordWrite(where, jwtPayload, weekOId)

      // 2. 클럽의 주차 배열 조회 뙇!!
      const {weekRowArr} = await this.dbHubService.readWeekRowArrByClubOId(where, weekRow.clubOId)

      // 3. 처음이나 마지막이 아니면 에러 뙇!!
      const weekIndex = weekRowArr.findIndex(row => row.weekOId === weekOId)

      if (weekIndex !== 0 && weekIndex !== weekRowArr.length - 1) {
        throw {
          gkd: {limit: `처음이나 마지막 주차만 삭제할 수 있습니다.`},
          gkdErrCode: 'CLIENTRECORDPORT_REMOVE_WEEK_ROW_NOT_FIRST_OR_LAST',
          gkdErrMsg: `처음이나 마지막 주차만 삭제할 수 있습니다.`,
          gkdStatus: {weekOId, weekIndex},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 4. 주간 기록 삭제 뙇!!
      await this.dbHubService.deleteWeekRow(where, weekOId)

      // 5. 갱신된 클럽의 주차 배열 뙇!!
      const {weekRowArr: updatedWeekRowArr} = await this.dbHubService.readWeekRowArrByClubOId(where, weekRow.clubOId)

      // 6. 리턴 뙇!!
      return {weekRowArr: updatedWeekRowArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
