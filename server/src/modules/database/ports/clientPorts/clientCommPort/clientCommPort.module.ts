import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientCommPortService} from './clientCommPort.service'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [ClientCommPortService],
  exports: [ClientCommPortService]
})
export class ClientCommPortModule {}
