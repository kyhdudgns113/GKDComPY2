import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class DailyRecordDBService {
  constructor(private readonly dbService: DBService) {}

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
