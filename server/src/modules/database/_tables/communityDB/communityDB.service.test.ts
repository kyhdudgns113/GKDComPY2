import {DBServiceTest} from '../_db'
import {CommunityDBService} from './communityDB.service'

export class CommunityDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static communityDBService = new CommunityDBService(CommunityDBServiceTest.dbService)
}
