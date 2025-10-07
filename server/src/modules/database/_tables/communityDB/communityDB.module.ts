import {Module} from '@nestjs/common'
import {CommunityDBService} from './communityDB.service'

import {DBModule} from '../_db'

@Module({
  imports: [DBModule],
  controllers: [],
  providers: [CommunityDBService],
  exports: [CommunityDBService]
})
export class CommunityDBModule {}
