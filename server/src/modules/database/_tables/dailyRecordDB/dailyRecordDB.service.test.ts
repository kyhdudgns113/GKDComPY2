import {DBServiceTest} from '../_db'
import {DailyRecordDBService} from './dailyRecordDB.service'

export class DailyRecordDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static dailyRecordDBService = new DailyRecordDBService(DailyRecordDBServiceTest.dbService)
}
