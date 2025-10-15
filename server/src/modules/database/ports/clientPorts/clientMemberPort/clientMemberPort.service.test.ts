import {ClientMemberPortService} from './clientMemberPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class ClientMemberPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static clientMemberPortService = new ClientMemberPortService(ClientMemberPortServiceTest.dbHubService)
}
