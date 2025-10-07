import {Module} from '@nestjs/common'
import {AdminAuthPortService} from './adminAuthPort.service'
import {DBHubModule} from '@modules/database/dbHub'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [AdminAuthPortService],
  exports: [AdminAuthPortService]
})
export class AdminAuthPortModule {}
