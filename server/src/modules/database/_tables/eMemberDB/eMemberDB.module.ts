import {Module} from '@nestjs/common'
import {EMemberDBService} from './eMemberDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [EMemberDBService],
  exports: [EMemberDBService]
})
export class EMemberDBModule {}
