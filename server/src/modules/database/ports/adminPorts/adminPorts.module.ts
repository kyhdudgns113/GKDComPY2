import {Module} from '@nestjs/common'
import {AdminAuthPortModule, AdminAuthPortService} from './adminAuthPort'
import {AdminCommPortModule, AdminCommPortService} from './adminCommPort'
import {DBHubModule} from '@modules/database/dbHub'

@Module({
  imports: [AdminAuthPortModule, AdminCommPortModule, DBHubModule],
  controllers: [],
  providers: [AdminAuthPortService, AdminCommPortService],
  exports: [AdminAuthPortService]
})
export class AdminPortsModule {}
