import {Module} from '@nestjs/common'
import {ClubDBService} from './clubDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [ClubDBService],
  exports: [ClubDBService]
})
export class ClubDBModule {}
