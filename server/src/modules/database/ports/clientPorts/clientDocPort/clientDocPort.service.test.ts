import {ClientDocPortService} from './clientDocPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class ClientDocPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static clientDocPortService = new ClientDocPortService(ClientDocPortServiceTest.dbHubService)
}
