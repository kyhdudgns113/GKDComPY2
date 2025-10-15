import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientDocPortService} from './clientDocPort.service'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [ClientDocPortService],
  exports: [ClientDocPortService]
})
export class ClientDocPortModule {}
