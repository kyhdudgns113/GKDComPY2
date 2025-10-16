import {Module} from '@nestjs/common'
import {ClientRecordPortService} from './clientRecordPort.service'
import {DBHubModule} from '@modules/database/dbHub'

@Module({
  imports: [DBHubModule],
  providers: [ClientRecordPortService],
  exports: [ClientRecordPortService]
})
export class ClientRecordPortModule {}
