import {DBServiceTest} from '../_db'
import {WeekRecordDBService} from './weekRecordDB.service'

export class WeekRecordDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static weekRecordDBService = new WeekRecordDBService(WeekRecordDBServiceTest.dbService)
}
