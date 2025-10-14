import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {SocketPortService} from './socketPort.service'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [SocketPortService],
  exports: [SocketPortService]
})
export class SocketPortModule {}
