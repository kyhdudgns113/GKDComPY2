import {DBHubService} from './dbHub.service'
import * as TB from '../_tables'

export class DBHubServiceTest {
  private static chatDBService = TB.ChatDBServiceTest.chatDBService
  private static clubDBService = TB.ClubDBServiceTest.clubDBService
  private static communityDBService = TB.CommunityDBServiceTest.communityDBService
  private static dailyRecordDBService = TB.DailyRecordDBServiceTest.dailyRecordDBService
  private static docDBService = TB.DocDBServiceTest.docDBService
  private static memberDBService = TB.MemberDBServiceTest.memberDBService
  private static userDBService = TB.UserDBServiceTest.userDBService
  private static weekRecordDBService = TB.WeekRecordDBServiceTest.weekRecordDBService

  public static dbHubService = new DBHubService(
    this.chatDBService,
    this.clubDBService,
    this.communityDBService,
    this.dailyRecordDBService,
    this.docDBService,
    this.memberDBService,
    this.userDBService,
    this.weekRecordDBService
  )
}
