import {Module} from '@nestjs/common'
import {CopyMeDBService} from './_CopyMeDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [CopyMeDBService],
  exports: [CopyMeDBService]
})
export class CopyMeDBModule {}
