import {Module} from '@nestjs/common'
import {DBHubModule} from './dbHub'

import * as P from './ports'

@Module({
  imports: [
    DBHubModule,
    // ::
    P.AdminPortsModule
  ],
  controllers: [],
  providers: [P.AdminAuthPortService],
  exports: [P.AdminAuthPortService]
})
export class DatabaseModule {}
