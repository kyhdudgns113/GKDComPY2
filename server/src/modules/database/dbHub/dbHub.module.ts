import {Module} from '@nestjs/common'
import {DBHubService} from './dbHub.service'

@Module({
  imports: [],
  controllers: [],
  providers: [DBHubService],
  exports: [DBHubService]
})
export class DBHubModule {}
