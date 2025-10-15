import {ClientChatPortService} from './clientChatPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class ClientChatPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static clientChatPortService = new ClientChatPortService(ClientChatPortServiceTest.dbHubService)
}
