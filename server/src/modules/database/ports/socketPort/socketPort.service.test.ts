import {SocketPortService} from './socketPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'

export class SocketPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  public static socketPortService = new SocketPortService(SocketPortServiceTest.dbHubService)
}
