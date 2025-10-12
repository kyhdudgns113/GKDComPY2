import {ClientCommPortService} from './clientCommPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class ClientCommPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static clientCommPortService = new ClientCommPortService(ClientCommPortServiceTest.dbHubService)
}
