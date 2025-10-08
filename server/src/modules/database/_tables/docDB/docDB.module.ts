import {Module} from '@nestjs/common'
import {DocDBService} from './docDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [DocDBService],
  exports: [DocDBService]
})
export class DocDBModule {}
