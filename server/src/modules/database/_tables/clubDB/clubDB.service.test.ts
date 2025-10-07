import {DBServiceTest} from '../_db'
import {ClubDBService} from './clubDB.service'

export class ClubDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static clubDBService = new ClubDBService(ClubDBServiceTest.dbService)
}
