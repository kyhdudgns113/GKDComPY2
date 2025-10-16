import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class WeekRecordDBService {
  constructor(private readonly dbService: DBService) {}

  async readWeekRowArrByClubOId(where: string, clubOId: string) {
    const connection = await this.dbService.getConnection()

    try {
      const queryReadWeekRows = `SELECT * FROM weekRows WHERE clubOId = ? ORDER BY startDateVal DESC`
      const paramReadWeekRows = [clubOId]
      const [rows] = await connection.execute(queryReadWeekRows, paramReadWeekRows)
      const resultArray = rows as RowDataPacket[]

      const weekRowArr: T.WeekRowType[] = resultArray.map(row => ({
        weekOId: row.weekOId,
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
