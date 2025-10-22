import {Module} from '@nestjs/common'
import {
  ChatDBModule,
  ChatDBService,
  ClubDBModule,
  ClubDBService,
  CommunityDBModule,
  CommunityDBService,
  DailyRecordDBModule,
  DailyRecordDBService,
  GDocumentDBService,
  GDocumentModule,
  MemberDBModule,
  MemberDBService,
  UserDBModule,
  UserDBService,
  WeeklyRecordDBModule,
  WeeklyRecordDBService
} from './schemas'

@Module({
  imports: [ChatDBModule, ClubDBModule, CommunityDBModule, DailyRecordDBModule, GDocumentModule, MemberDBModule, UserDBModule, WeeklyRecordDBModule],
  controllers: [],
  providers: [
    ChatDBService,
    ClubDBService,
    CommunityDBService,
    DailyRecordDBService,
    GDocumentDBService,
    MemberDBService,
    UserDBService,
    WeeklyRecordDBService
  ],
  exports: [
    ChatDBService,
    ClubDBService,
    CommunityDBService,
    DailyRecordDBService,
    GDocumentDBService,
    MemberDBService,
    UserDBService,
    WeeklyRecordDBService
  ]
})
export class MongoDBModule {}
