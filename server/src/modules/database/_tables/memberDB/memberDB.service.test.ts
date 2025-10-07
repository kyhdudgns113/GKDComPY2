import {DBServiceTest} from '../_db'
import {MemberDBService} from './memberDB.service'

export class MemberDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static memberDBService = new MemberDBService(MemberDBServiceTest.dbService)
}
