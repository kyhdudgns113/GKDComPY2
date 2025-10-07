import {Module} from '@nestjs/common'
import {WeekRecordDBService} from './weekRecordDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [WeekRecordDBService],
  exports: [WeekRecordDBService]
})
export class WeekRecordDBModule {}
