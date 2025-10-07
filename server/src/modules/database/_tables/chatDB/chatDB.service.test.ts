import {DBServiceTest} from '../_db'
import {CopyMeDBService} from './chatDB.service'

export class CopyMeDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static copyMeDBService = new CopyMeDBService(CopyMeDBServiceTest.dbService)
}
