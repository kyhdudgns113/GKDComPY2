import {Module} from '@nestjs/common'
import {DailyRecordDBService} from './dailyRecordDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [DailyRecordDBService],
  exports: [DailyRecordDBService]
})
export class DailyRecordDBModule {}
