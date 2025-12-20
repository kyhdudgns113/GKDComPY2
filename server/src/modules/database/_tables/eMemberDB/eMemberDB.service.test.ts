import {DBServiceTest} from '../_db'
import {EMemberDBService} from './eMemberDB.service'

export class EMemberDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static eMemberDBService = new EMemberDBService(EMemberDBServiceTest.dbService)
}
