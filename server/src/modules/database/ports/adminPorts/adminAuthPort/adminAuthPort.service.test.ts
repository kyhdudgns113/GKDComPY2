import {AdminAuthPortService} from './adminAuthPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class AdminAuthPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static adminAuthPortService = new AdminAuthPortService(AdminAuthPortServiceTest.dbHubService)
}
