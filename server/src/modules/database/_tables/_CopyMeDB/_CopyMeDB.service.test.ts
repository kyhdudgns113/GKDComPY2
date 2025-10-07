import {DBServiceTest} from '../_db'
import {CopyMeDBService} from './_CopyMeDB.service'

export class CopyMeDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static copyMeDBService = new CopyMeDBService(CopyMeDBServiceTest.dbService)
}
