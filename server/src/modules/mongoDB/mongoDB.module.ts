import {Module} from '@nestjs/common'

import * as M from './schemas'

@Module({
  imports: [
    M.ChatDBModule,
    M.ClubDBModule,
    M.CommunityDBModule,
    M.DailyRecordDBModule,
    M.GDocumentModule,
    M.MemberDBModule,
    M.UserDBModule,
    M.WeeklyRecordDBModule
  ],
  controllers: [],
  providers: [],
  exports: [
    M.ChatDBModule,
    M.ClubDBModule,
    M.CommunityDBModule,
    M.DailyRecordDBModule,
    M.GDocumentModule,
    M.MemberDBModule,
    M.UserDBModule,
    M.WeeklyRecordDBModule
  ]
})
export class MongoDBModule {}
