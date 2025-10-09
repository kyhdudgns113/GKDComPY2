import {Module} from '@nestjs/common'
import {AdminCommPortService} from './adminCommPort.service'
import {DBHubModule} from '@modules/database/dbHub'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [AdminCommPortService],
  exports: [AdminCommPortService]
})
export class AdminCommPortModule {}
