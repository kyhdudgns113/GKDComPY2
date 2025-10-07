import {Module} from '@nestjs/common'
import {MemberDBService} from './memberDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [MemberDBService],
  exports: [MemberDBService]
})
export class MemberDBModule {}
