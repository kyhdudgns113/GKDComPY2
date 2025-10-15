import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientMemberPortService} from './clientMemberPort.service'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [ClientMemberPortService],
  exports: [ClientMemberPortService]
})
export class ClientMemberPortModule {}
