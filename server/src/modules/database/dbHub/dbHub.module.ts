import {Module} from '@nestjs/common'
import {DBHubService} from './dbHub.service'

import * as TB from '../_tables'

@Module({
  imports: [
    TB.ChatDBModule,
    TB.ClubDBModule,
    TB.CommunityDBModule,
    TB.DailyRecordDBModule,
    TB.DocDBModule,
    TB.EMemberDBModule,
    TB.MemberDBModule,
    TB.UserDBModule,
    TB.WeekRecordDBModule
  ],
  controllers: [],
  providers: [DBHubService],
  exports: [DBHubService]
})
export class DBHubModule {}
