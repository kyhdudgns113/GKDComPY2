import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientChatPortService} from './clientChatPort.service'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [ClientChatPortService],
  exports: [ClientChatPortService]
})
export class ClientChatPortModule {}
