import {Module} from '@nestjs/common'
import {AdminAuthPortModule, AdminAuthPortService} from './adminAuthPort'
import {DBHubModule} from '@modules/database/dbHub'

@Module({
  imports: [AdminAuthPortModule, DBHubModule],
  controllers: [],
  providers: [AdminAuthPortService],
  exports: [AdminAuthPortService]
})
export class AdminPortsModule {}
