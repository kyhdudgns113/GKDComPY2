import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as T from '@type'

@Injectable()
export class DailyRecordDBService {
  constructor(private readonly dbService: DBService) {}

  async createOrUpdateDailyRecord(where: string, dto: DTO.CreateOrUpdateDailyRecordDTO) {
    where = where + `/createOrUpdateDailyRecord`
    const connection = await this.dbService.getConnection()
    /**
     * createOrUpdateDailyRecord
     * - 일일 대전기록 작성 함수 (기록이 없으면 생성, 있으면 업데이트)
     *
     * 입력값
     * - dto: CreateOrUpdateDailyRecordDTO
     *     + weekOId: 주간 기록의 OId
     *     + rowMemName: 행 멤버 이름
     *     + dateVal: 날짜 값
     *     + result0: 1경기 결과
     *     + result1: 2경기 결과
     *     + result2: 3경기 결과
     *     + condError: 컨디션 에러
     *     + comment: 코멘트
     *
     * 출력값
     * - 없음
     *
     * 작동 순서
     * 1. 기존 기록 존재 여부 확인 뙇!!
     * 2. 기록이 있으면 UPDATE, 없으면 INSERT 뙇!!
     */

    const {weekOId, rowMemName, dateVal, result0, result1, result2, condError, comment} = dto

    try {
      // 1. 기존 기록 존재 여부 확인 뙇!!
      const queryCheck = `
        SELECT * FROM dailyRecords 
        WHERE weekOId = ? AND rowMemName = ? AND dateVal = ?
      `
      const paramCheck = [weekOId, rowMemName, dateVal]
      const [rows] = await connection.execute(queryCheck, paramCheck)
      const resultArray = rows as RowDataPacket[]

      // 2. 기록이 있으면 UPDATE, 없으면 INSERT 뙇!!
      if (resultArray.length > 0) {
        // UPDATE
        const queryUpdate = `
          UPDATE dailyRecords
          SET result0 = ?, result1 = ?, result2 = ?, condError = ?, comment = ?
          WHERE weekOId = ? AND rowMemName = ? AND dateVal = ?
        `
        const paramUpdate = [result0, result1, result2, condError, comment, weekOId, rowMemName, dateVal]
        await connection.execute(queryUpdate, paramUpdate)
      } // ::
      else {
        // INSERT - clubOId와 memOId는 weekRows와 rowMemberInfos에서 가져오기
        const queryGetInfo = `
          SELECT wr.clubOId, rmi.memOId 
          FROM weekRows wr
          JOIN rowMemberInfos rmi ON wr.weekOId = rmi.weekOId
          WHERE rmi.weekOId = ? AND rmi.rowMemName = ?
        `
        const paramGetInfo = [weekOId, rowMemName]
        const [infoRows] = await connection.execute(queryGetInfo, paramGetInfo)
        const infoArray = infoRows as RowDataPacket[]

        if (infoArray.length === 0) {
          throw {
            gkd: {notFound: `해당 행 멤버를 찾을 수 없습니다.`},
            gkdErrCode: 'WEEKRECORDDB_WRITE_DAILY_RECORD_ROW_MEMBER_NOT_FOUND',
            gkdErrMsg: `해당 행 멤버를 찾을 수 없습니다.`,
            gkdStatus: {weekOId, rowMemName},
            statusCode: 404,
            where
          } as T.ErrorObjType
        }

        const {clubOId, memOId} = infoArray[0]

        const queryInsert = `
          INSERT INTO dailyRecords 
            (weekOId, clubOId, rowMemName, memOId, dateVal, result0, result1, result2, condError, comment)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        const paramInsert = [weekOId, clubOId, rowMemName, memOId, dateVal, result0, result1, result2, condError, comment]
        await connection.execute(queryInsert, paramInsert)
      }
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

  async readDailyRecordArrByMemOIdAndDateRange(where: string, memOId: string, startDateVal: number, endDateVal: number) {
    const connection = await this.dbService.getConnection()
    try {
      const queryReadDailyRecords = `SELECT * FROM dailyRecords WHERE memOId = ? AND dateVal BETWEEN ? AND ?`
      const paramReadDailyRecords = [memOId, startDateVal, endDateVal]
      const [rows] = await connection.execute(queryReadDailyRecords, paramReadDailyRecords)
      const resultArray = rows as RowDataPacket[]

      const dailyRecordArr: T.DailyRecordType[] = resultArray.map(row => ({
        clubOId: row.clubOId,
        comment: row.comment,
        condError: row.condError,
        dateVal: row.dateVal,
        memOId: row.memOId,
        result0: row.result0,
        result1: row.result1,
        result2: row.result2,
        rowMemName: row.rowMemName,
        weekOId: row.weekOId
      }))

      return {dailyRecordArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
      // ::
    }
  }
  async readDailyRecordArrByWeekOId(where: string, weekOId: string) {
    const connection = await this.dbService.getConnection()

    try {
      const queryReadDailyRecords = `SELECT * FROM dailyRecords WHERE weekOId = ?`
      const paramReadDailyRecords = [weekOId]
      const [rows] = await connection.execute(queryReadDailyRecords, paramReadDailyRecords)
      const resultArray = rows as RowDataPacket[]

      const dailyRecordArr: T.DailyRecordType[] = resultArray.map(row => ({
        weekOId: row.weekOId,
        clubOId: row.clubOId,
        memOId: row.memOId,
        rowMemName: row.rowMemName,
        dateVal: row.dateVal,
        result0: row.result0,
        result1: row.result1,
        result2: row.result2,
        condError: row.condError,
        comment: row.comment
      }))

      return {dailyRecordArr}
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
