import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as T from '@type'
import * as U from '@util'

@Injectable()
export class WeekRecordDBService {
  constructor(private readonly dbService: DBService) {}

  async createWeekRow(where: string, dto: DTO.CreateWeekRowDTO) {
    where = where + `/createWeekRow`
    const connection = await this.dbService.getConnection()
    /**
     * createWeekRow
     * - 주간 기록 행 생성 함수
     *
     * 입력값
     * - clubOId: string
     *     + 클럽의 OId
     * - startDateVal: number
     *     + 시작 날짜
     * - endDateVal: number
     *     + 종료 날짜
     * - title: string
     *     + 제목
     *
     * 출력값
     * - 없음
     *
     * 작동 순서
     * 1. OId 들 중복체크 및 재생성
     * 2. 주간 기록 행 생성 쿼리 뙇!!
     * 3. 헹 장버 셍상(멤버 정보)
     * 4. 열 정보 생성(날짜 정보)
     * 5. 리턴 뙇!!
     */

    let weekOId = generateObjectId()
    const {clubOId, startDateVal, endDateVal, title, isNext} = dto
    try {
      // 1. OId 들 중복체크 및 재생성
      while (true) {
        const queryRead = 'SELECT weekOId FROM weekRows WHERE weekOId = ?'
        const paramRead = [weekOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        weekOId = generateObjectId()
      }

      // 2. 주간 기록 행 생성 쿼리 뙇!!
      const queryCreateWeekRow = `INSERT INTO weekRows (weekOId, clubOId, startDateVal, endDateVal, title) VALUES (?, ?, ?, ?, ?)`
      const paramCreateWeekRow = [weekOId, clubOId, startDateVal, endDateVal, title]
      await connection.execute(queryCreateWeekRow, paramCreateWeekRow)

      /**
       * 3. 헹 장버 셍상(멤버 정보)
       *     1. 다음 주차 생성중일때
       *         1. 클럽의 현재 멤버 목록 조회
       *         2. 해당 멤버 정보들을 토대로 rowMemberInfos 테이블에 생성
       *     2. 이전 주차 생성중일때
       *         1. 가장 예전 주차의 rowMemberInfos 목록 조회
       *         2. 해당 멤버 정보들을 토대로 rowMemberInfos 테이블에 생성
       */
      if (isNext) {
        // 다음 주차 생성중일때

        // 3-1. 클럽의 현재 멤버 목록 조회
        const queryReadClubMembers = `SELECT * FROM members WHERE clubOId = ?`
        const paramReadClubMembers = [clubOId]
        const [rows] = await connection.execute(queryReadClubMembers, paramReadClubMembers)
        const resultArray = rows as RowDataPacket[]

        // 3-2. 해당 멤버 정보들을 토대로 rowMemberInfos 테이블에 생성
        if (resultArray.length > 0) {
          const valuesPlaceholder = resultArray.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')
          const queryCreateRowMemberInfos = `INSERT INTO rowMemberInfos (batterPower, memOId, pitcherPower, position, rowMemName, weekOId) VALUES ${valuesPlaceholder}`
          const paramCreateRowMemberInfos = resultArray.flatMap(row => [
            row.batterPower,
            row.memOId,
            row.pitcherPower,
            row.position,
            row.memName,
            weekOId
          ])
          await connection.execute(queryCreateRowMemberInfos, paramCreateRowMemberInfos)
        }
      } // ::
      else {
        // 이전 주차 생성중일때

        // 3-1. 가장 예전 주차의 rowMemberInfos 목록 조회
        const queryReadOldestWeekRow = `
          SELECT * FROM rowMemberInfos WHERE weekOId = (
            SELECT weekOId FROM weekRows WHERE clubOId = ? AND startDateVal = ? AND endDateVal = ?
          )
        `
        const paramReadOldestWeekRow = [clubOId, U.shiftDateValue(startDateVal, 7), U.shiftDateValue(endDateVal, 7)]
        const [rows] = await connection.execute(queryReadOldestWeekRow, paramReadOldestWeekRow)
        const resultArray = rows as RowDataPacket[]

        // 3-2. 해당 멤버 정보들을 토대로 rowMemberInfos 테이블에 생성
        if (resultArray.length > 0) {
          const valuesPlaceholder = resultArray.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')
          const queryCreateRowMemberInfos = `
            INSERT INTO rowMemberInfos 
              (batterPower, memOId, pitcherPower, position, rowMemName, weekOId)
              VALUES ${valuesPlaceholder}
          `
          const paramCreateRowMemberInfos = resultArray.flatMap(row => [
            row.batterPower,
            row.memOId,
            row.pitcherPower,
            row.position,
            row.rowMemName,
            weekOId
          ])
          await connection.execute(queryCreateRowMemberInfos, paramCreateRowMemberInfos)
        }
      }

      // 4. 열 정보 생성(날짜 정보)
      const queryCreateDate = `
        INSERT INTO weekRowDateInfos
          (weekOId, dateVal, enemyName, pitchOrder, dailyOrder, comments)
          VALUES
          ${Array.from({length: 6})
            .map(() => '(?, ?, ?, ?, ?, ?)')
            .join(', ')}
      `
      const paramCreateDate = Array.from({length: 6})
        .map((_, index) => [
          weekOId, // ::
          U.shiftDateValue(startDateVal, index),
          '',
          0,
          '',
          ''
        ])
        .flat()
      await connection.execute(queryCreateDate, paramCreateDate)

      // 5. 리턴 뙇!!
      const weekRow: T.WeekRowType = {
        weekOId,
        clubOId,
        startDateVal,
        endDateVal,
        title
      }
      return {weekRow}
      // ::
    } catch (errObj) {
      // ::
      const delQuery = 'DELETE FROM weekRows WHERE weekOId = ?'
      const delParam = [weekOId]
      await connection.execute(delQuery, delParam)

      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async readWeekRowArrByClubOId(where: string, clubOId: string) {
    const connection = await this.dbService.getConnection()

    try {
      const queryReadWeekRows = `SELECT * FROM weekRows WHERE clubOId = ? ORDER BY startDateVal DESC`
      const paramReadWeekRows = [clubOId]
      const [rows] = await connection.execute(queryReadWeekRows, paramReadWeekRows)
      const resultArray = rows as RowDataPacket[]

      const weekRowArr: T.WeekRowType[] = resultArray.map(row => ({
        weekOId: row.weekOId,
        clubOId: row.clubOId,
        startDateVal: row.startDateVal,
        endDateVal: row.endDateVal,
        title: row.title
      }))

      return {weekRowArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }
}
