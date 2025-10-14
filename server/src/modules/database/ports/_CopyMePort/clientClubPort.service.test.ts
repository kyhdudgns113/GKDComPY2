import {ClientClubPortService} from './clientClubPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class ClientClubPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static clientClubPortService = new ClientClubPortService(ClientClubPortServiceTest.dbHubService)
}
