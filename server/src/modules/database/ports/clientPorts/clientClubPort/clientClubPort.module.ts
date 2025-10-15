import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientClubPortService} from './clientClubPort.service'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [ClientClubPortService],
  exports: [ClientClubPortService]
})
export class ClientClubPortModule {}
