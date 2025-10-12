import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientAuthPortService} from './clientAuthPort.service'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [ClientAuthPortService],
  exports: [ClientAuthPortService]
})
export class ClientAuthPortModule {}
