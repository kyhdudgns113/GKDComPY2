import {AdminCommPortService} from './adminCommPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class AdminCommPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static adminCommPortService = new AdminCommPortService(AdminCommPortServiceTest.dbHubService)
}
