import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {GKDLockModule} from '@modules/gkdLock'
import {SocketPortService} from './socketPort.service'

@Module({
  imports: [DBHubModule, GKDLockModule],
  controllers: [],
  providers: [SocketPortService],
  exports: [SocketPortService]
})
export class SocketPortModule {}
