import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as T from '@type'

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
     * 3. 리턴 뙇!!
     */

    let weekOId = generateObjectId()
    const {clubOId, startDateVal, endDateVal, title} = dto
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
      const paramCreateWeekRow = [generateObjectId(), clubOId, startDateVal, endDateVal, title]
      await connection.execute(queryCreateWeekRow, paramCreateWeekRow)

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
