import {SocketPortService} from './socketPort.service'
import {DBHubServiceTest} from '@modules/database/dbHub'
import {GKDLockTest} from '@modules/gkdLock'

export class SocketPortServiceTest {
  private static dbHubService = DBHubServiceTest.dbHubService
  private static lockService = GKDLockTest.lockService
  public static socketPortService = new SocketPortService(SocketPortServiceTest.dbHubService, SocketPortServiceTest.lockService)
}
