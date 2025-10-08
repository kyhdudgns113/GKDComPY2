import {DBServiceTest} from '../_db'
import {DocDBService} from './docDB.service'

export class DocDBServiceTest {
  private static dbService = DBServiceTest.dbService

  public static docDBService = new DocDBService(DocDBServiceTest.dbService)
}
