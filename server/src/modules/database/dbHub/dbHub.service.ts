import {Injectable} from '@nestjs/common'

import * as DTO from '@dto'
import * as T from '@type'
import * as TB from '../_tables'
import {AUTH_ADMIN, AUTH_GOLD, AUTH_NORMAL, AUTH_SILVER} from '@secret'

/**
 * 이곳은 거의 대부분 Schema 의 함수랑 결과를 그대로 보내주는 역할만 한다.
 *
 * 이것들은 port 에서 해줘야 한다.
 * - 인자의 Error 체크
 * - 권한 체크 함수 실행
 *    - port 에서 db 접근할때마다 권한체크하면 오버헤드 심해진다.
 *
 * 이건 여기서 해준다.
 * - 권한 체크 함수 작성
 */
@Injectable()
export class DBHubService {
  constructor(
    private readonly chatDBService: TB.ChatDBService,
    private readonly clubDBService: TB.ClubDBService,
    private readonly communityDBService: TB.CommunityDBService,
    private readonly dailyRecordDBService: TB.DailyRecordDBService,
    private readonly docDBService: TB.DocDBService,

    private readonly memberDBService: TB.MemberDBService,
    private readonly userDBService: TB.UserDBService,
    private readonly weekRecordDBService: TB.WeekRecordDBService
  ) {}

  // AREA1: Chat Area

  async createChat(where: string, dto: DTO.CreateChatDTO) {
    try {
      const {chat} = await this.chatDBService.createChat(where, dto)
      return {chat}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readChatArrByClubOId(where: string, clubOId: string, lastChatIdx: number) {
    try {
      const {chatArr} = await this.chatDBService.readChatArrByClubOId(where, clubOId, lastChatIdx)
      return {chatArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readChatRoomByChatRoomOId(where: string, chatRoomOId: string) {
    try {
      const {chatRoom} = await this.chatDBService.readChatRoomByChatRoomOId(where, chatRoomOId)
      return {chatRoom}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA2: Club Area

  async createClub(where: string, dto: DTO.CreateClubDTO) {
    try {
      const {club} = await this.clubDBService.createClub(where, dto)
      return {club}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readClubArrByCommOId(where: string, commOId: string) {
    try {
      const {clubArr} = await this.clubDBService.readClubArrByCommOId(where, commOId)
      return {clubArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readClubByClubOId(where: string, clubOId: string) {
    try {
      const {club} = await this.clubDBService.readClubByClubOId(where, clubOId)
      return {club}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readClubWeekInfo(where: string, clubOId: string) {
    try {
      const {lastAddPrevWeekDate, numOfAddedPrevWeek} = await this.clubDBService.readClubWeekInfo(where, clubOId)
      return {lastAddPrevWeekDate, numOfAddedPrevWeek}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateClub(where: string, dto: DTO.UpdateClubDTO) {
    try {
      await this.clubDBService.updateClub(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async updateClubWeekInfo(where: string, clubOId: string, todayValue: number, numOfAddedPrevWeek: number) {
    try {
      await this.clubDBService.updateClubWeekInfo(where, clubOId, todayValue, numOfAddedPrevWeek)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA3: Community Area

  async createCommunity(where: string, dto: DTO.CreateCommunityAdminDTO) {
    try {
      const {community} = await this.communityDBService.createCommunity(where, dto)
      return {community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readCommunityArr(where: string) {
    try {
      const {commArr} = await this.communityDBService.readCommunityArr(where)
      return {commArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readCommunityByCommOId(where: string, commOId: string) {
    try {
      const {community} = await this.communityDBService.readCommunityByCommOId(where, commOId)
      return {community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readCommunityDocument(where: string, commOId: string) {
    try {
      const {contents} = await this.communityDBService.readCommunityDocument(where, commOId)
      return {contents}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateCommunityDocument(where: string, dto: DTO.UpdateCommDocDTO) {
    try {
      await this.communityDBService.updateCommunityDocument(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA4: DailyRecord Area

  async createOrUpdateDailyRecord(where: string, dto: DTO.CreateOrUpdateDailyRecordDTO) {
    try {
      await this.dailyRecordDBService.createOrUpdateDailyRecord(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readDailyRecordArrByMemOIdAndDateRange(where: string, memOId: string, startDateVal: number, endDateVal: number) {
    try {
      const {dailyRecordArr} = await this.dailyRecordDBService.readDailyRecordArrByMemOIdAndDateRange(where, memOId, startDateVal, endDateVal)
      return {dailyRecordArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readDailyRecordArrByWeekOId(where: string, weekOId: string) {
    try {
      const {dailyRecordArr} = await this.dailyRecordDBService.readDailyRecordArrByWeekOId(where, weekOId)
      return {dailyRecordArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA5: Document Area

  async readDocumentByClubOId(where: string, clubOId: string) {
    try {
      const {document, contents} = await this.docDBService.readDocumentByClubOId(where, clubOId)
      return {document, contents}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateDocument(where: string, dto: DTO.UpdateDocumentDTO) {
    try {
      await this.docDBService.updateDocument(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA1: Member Area

  async createClubMember(where: string, dto: DTO.CreateClubMemberDTO) {
    try {
      const {member} = await this.memberDBService.createClubMember(where, dto)
      return {member}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readClubMemberArrByClubOId(where: string, clubOId: string) {
    try {
      const {clubMemberArr} = await this.memberDBService.readClubMemberArrByClubOId(where, clubOId)
      return {clubMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readCommMemberArrByCommOId(where: string, commOId: string) {
    try {
      const {commMemberArr} = await this.memberDBService.readCommMemberArrByCommOId(where, commOId)
      return {commMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readClubMemberByMemOId(where: string, memOId: string) {
    try {
      const {member} = await this.memberDBService.readClubMemberByMemOId(where, memOId)
      return {member}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readMemberCardArrByMemOId(where: string, memOId: string) {
    try {
      const {cardArr} = await this.memberDBService.readMemberCardArrByMemOId(where, memOId)
      return {cardArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateClubMemberInfo(where: string, dto: DTO.UpdateMemberInfoDTO) {
    try {
      await this.memberDBService.updateClubMemberInfo(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async updateMemberCard(where: string, dto: DTO.UpdateMemberCardDTO) {
    try {
      await this.memberDBService.updateMemberCard(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async updateMemberClubOId(where: string, dto: DTO.UpdateMemberClubOIdDTO) {
    try {
      await this.memberDBService.updateMemberClubOId(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteClubMember(where: string, memOId: string) {
    try {
      await this.memberDBService.deleteClubMember(where, memOId)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA2: User Area

  async createUser(where: string, dto: DTO.CreateUserDTO) {
    try {
      const {user} = await this.userDBService.createUser(where, dto)
      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async createUserAdmin(where: string, dto: DTO.CreateUserAdminDTO) {
    try {
      await this.userDBService.createUserAdmin(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readUserArrByCommOId(where: string, commOId: string) {
    try {
      const {userArr} = await this.userDBService.readUserArrByCommOId(where, commOId)
      return {userArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readUserByIdPw(where: string, userId: string, password: string) {
    try {
      const {user} = await this.userDBService.readUserByIdPw(where, userId, password)
      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readUserByUserOId(where: string, userOId: string) {
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)
      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateUser(where: string, dto: DTO.UpdateUserDTO) {
    try {
      await this.userDBService.updateUser(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteUser(where: string, userOId: string) {
    try {
      await this.userDBService.deleteUser(where, userOId)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA3: WeekRecord Area

  async createWeekRow(where: string, dto: DTO.CreateWeekRowDTO) {
    try {
      await this.weekRecordDBService.createWeekRow(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readWeekRowByWeekOId(where: string, weekOId: string) {
    try {
      const {weekRow} = await this.weekRecordDBService.readWeekRowByWeekOId(where, weekOId)
      return {weekRow}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readWeekRowArrByClubOId(where: string, clubOId: string) {
    try {
      const {weekRowArr} = await this.weekRecordDBService.readWeekRowArrByClubOId(where, clubOId)
      return {weekRowArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readDateInfoArrByWeekOId(where: string, weekOId: string) {
    try {
      const {dateInfoArr} = await this.weekRecordDBService.readDateInfoArrByWeekOId(where, weekOId)
      return {dateInfoArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async readRowMemberArrByWeekOId(where: string, weekOId: string) {
    try {
      const {rowMemberArr} = await this.weekRecordDBService.readRowMemberArrByWeekOId(where, weekOId)
      return {rowMemberArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async createRowMember(where: string, dto: DTO.CreateRowMemberDTO) {
    try {
      await this.weekRecordDBService.createRowMember(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateDateInfo(where: string, dto: DTO.UpdateDateInfoDTO) {
    try {
      await this.weekRecordDBService.updateDateInfo(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateWeeklyInfo(where: string, dto: DTO.UpdateWeeklyInfoDTO) {
    try {
      await this.weekRecordDBService.updateWeeklyInfo(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateRowMember(where: string, dto: DTO.UpdateRowMemberDTO) {
    try {
      await this.weekRecordDBService.updateRowMember(where, dto)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteWeekRow(where: string, weekOId: string) {
    try {
      await this.weekRecordDBService.deleteWeekRow(where, weekOId)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // AREA1: Check Auth Area

  async checkUserAdmin(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_ADMIN_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN) {
        throw {
          gkd: {userErr: `관리자가 아님`},
          gkdErrCode: 'DBHUB_CHECK_USER_ADMIN_NOT_ADMIN',
          gkdErrMsg: `관리자가 아님`,
          gkdStatus: {userOId, commAuth: user.commAuth},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async checkUserGold(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_GOLD_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }
      if (user.commAuth < AUTH_GOLD) {
        throw {
          gkd: {userErr: `골드가 아님`},
          gkdErrCode: 'DBHUB_CHECK_USER_GOLD_NOT_GOLD',
          gkdErrMsg: `골드가 아님`,
          gkdStatus: {userOId, commAuth: user.commAuth},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async checkUserSilver(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_SILVER_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth < AUTH_SILVER) {
        throw {
          gkd: {userErr: `실버가 아님`},
          gkdErrCode: 'DBHUB_CHECK_USER_SILVER_NOT_SILVER',
          gkdErrMsg: `실버가 아님`,
          gkdStatus: {userOId, commAuth: user.commAuth},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async checkUserNormal(where: string, jwtPayload: T.JwtPayloadType) {
    const {userOId} = jwtPayload
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_NORMAL_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth < AUTH_NORMAL) {
        throw {
          gkd: {userErr: `권한값이 음수임`},
          gkdErrCode: 'DBHUB_CHECK_USER_NORMAL_NOT_NORMAL',
          gkdErrMsg: `권한값이 음수임`,
          gkdStatus: {userOId, commAuth: user.commAuth},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async checkAuth_ChatRoomRead(where: string, jwtPayload: T.JwtPayloadType, chatRoomOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {chatRoom} = await this.chatDBService.readChatRoomByChatRoomOId(where, chatRoomOId)
      if (!chatRoom) {
        throw {
          gkd: {chatRoomErr: `채팅방이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_CHAT_ROOM',
          gkdErrMsg: `채팅방이 존재하지 않음`,
          gkdStatus: {chatRoomOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {club} = await this.clubDBService.readClubByClubOId(where, chatRoom.clubOId)

      if (!club) {
        throw {
          gkd: {clubErr: `클럽이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_CLUB',
          gkdErrMsg: `클럽이 존재하지 않음`,
          gkdStatus: {clubOId: chatRoom.clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {commOId} = club

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === commOId && user.commAuth >= AUTH_NORMAL)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, chatRoomOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, chatRoom}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async checkAuth_ChatRoomWrite(where: string, jwtPayload: T.JwtPayloadType, chatRoomOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {chatRoom} = await this.chatDBService.readChatRoomByChatRoomOId(where, chatRoomOId)
      if (!chatRoom) {
        throw {
          gkd: {chatRoomErr: `채팅방이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_CHAT_ROOM',
          gkdErrMsg: `채팅방이 존재하지 않음`,
          gkdStatus: {chatRoomOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {club} = await this.clubDBService.readClubByClubOId(where, chatRoom.clubOId)

      if (!club) {
        throw {
          gkd: {clubErr: `클럽이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_CLUB',
          gkdErrMsg: `클럽이 존재하지 않음`,
          gkdStatus: {clubOId: chatRoom.clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {commOId} = club

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === commOId && user.commAuth >= AUTH_SILVER)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_CHAT_ROOM_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, chatRoomOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, chatRoom}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async checkAuth_ClubRead(where: string, jwtPayload: T.JwtPayloadType, clubOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_CLUB_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {club} = await this.clubDBService.readClubByClubOId(where, clubOId)
      if (!club) {
        throw {
          gkd: {clubErr: `클럽이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_CLUB_AUTH_NO_CLUB',
          gkdErrMsg: `클럽이 존재하지 않음`,
          gkdStatus: {clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === club.commOId && user.commAuth >= AUTH_NORMAL)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_CLUB_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, club}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    }
  }
  async checkAuth_ClubWrite(where: string, jwtPayload: T.JwtPayloadType, clubOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_CLUB_AUTH_NO_USER_WRITE',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {club} = await this.clubDBService.readClubByClubOId(where, clubOId)
      if (!club) {
        throw {
          gkd: {clubErr: `클럽이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_CLUB_AUTH_NO_CLUB_WRITE',
          gkdErrMsg: `클럽이 존재하지 않음`,
          gkdStatus: {clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === club.commOId && user.commAuth >= AUTH_SILVER)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_CLUB_AUTH_NO_AUTHORITY_WRITE',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, club}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    }
  }

  async checkAuth_CommRead(where: string, jwtPayload: T.JwtPayloadType, commOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {community} = await this.communityDBService.readCommunityByCommOId(where, commOId)
      if (!community) {
        throw {
          gkd: {communityErr: `공동체가 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_COMMUNITY',
          gkdErrMsg: `공동체가 존재하지 않음`,
          gkdStatus: {commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && user.commOId !== commOId) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async checkAuth_CommWrite(where: string, jwtPayload: T.JwtPayloadType, commOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === commOId && user.commAuth >= AUTH_SILVER)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {community} = await this.communityDBService.readCommunityByCommOId(where, commOId)
      if (!community) {
        throw {
          gkd: {communityErr: `공동체가 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_COMM_AUTH_NO_COMMUNITY',
          gkdErrMsg: `공동체가 존재하지 않음`,
          gkdStatus: {commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async checkAuth_MemberRead(where: string, jwtPayload: T.JwtPayloadType, memOId: string) {
    const {userOId} = jwtPayload
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)
      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_MEMBER_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {member} = await this.memberDBService.readClubMemberByMemOId(where, memOId)
      if (!member) {
        throw {
          gkd: {memberErr: `멤버가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_MEMBER_AUTH_NO_MEMBER',
          gkdErrMsg: `멤버가 DB 에 없음`,
          gkdStatus: {memOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && user.commOId !== member.commOId) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_MEMBER_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, commOId: member.commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, member}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async checkAuth_MemberWrite(where: string, jwtPayload: T.JwtPayloadType, memOId: string) {
    const {userOId} = jwtPayload
    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)
      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_MEMBER_AUTH_NO_USER_WRITE',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {member} = await this.memberDBService.readClubMemberByMemOId(where, memOId)
      if (!member) {
        throw {
          gkd: {memberErr: `멤버가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_MEMBER_AUTH_NO_MEMBER_WRITE',
          gkdErrMsg: `멤버가 DB 에 없음`,
          gkdStatus: {memOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === member.commOId && user.commAuth >= AUTH_SILVER)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_MEMBER_AUTH_NO_AUTHORITY_WRITE',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, commOId: member.commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, member}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async checkAuth_UserWrite(where: string, jwtPayload: T.JwtPayloadType, _userOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)

      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {user: _user} = await this.userDBService.readUserByUserOId(where, _userOId)
      if (!_user) {
        throw {
          gkd: {userErr: `타겟 유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_AUTH_NO_USER',
          gkdErrMsg: `타겟 유저가 DB 에 없음`,
          gkdStatus: {_userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {commOId} = _user
      const {community} = await this.communityDBService.readCommunityByCommOId(where, commOId)
      if (!community) {
        throw {
          gkd: {communityErr: `공동체가 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_USER_AUTH_NO_COMMUNITY',
          gkdErrMsg: `공동체가 존재하지 않음`,
          gkdStatus: {commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const isAdmin = user.commAuth === AUTH_ADMIN
      const isSameComm = user.commOId === commOId
      const isUserGold = user.commAuth >= AUTH_GOLD
      const isUserSame = user.userOId === _user.userOId

      if (user.commAuth !== AUTH_ADMIN && !(isSameComm && (isUserGold || isUserSame))) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_USER_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, commOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {payloadUser: user, targetUser: _user, targetUserCommunity: community}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async checkAuth_RecordRead(where: string, jwtPayload: T.JwtPayloadType, weekOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)
      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {weekRow} = await this.weekRecordDBService.readWeekRowByWeekOId(where, weekOId)
      if (!weekRow) {
        throw {
          gkd: {weekRowErr: `주간 기록이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_WEEK_ROW',
          gkdErrMsg: `주간 기록이 존재하지 않음`,
          gkdStatus: {weekOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {club} = await this.clubDBService.readClubByClubOId(where, weekRow.clubOId)
      if (!club) {
        throw {
          gkd: {clubErr: `클럽이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_CLUB',
          gkdErrMsg: `클럽이 존재하지 않음`,
          gkdStatus: {clubOId: weekRow.clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === club.commOId && user.commAuth >= AUTH_NORMAL)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, clubOId: weekRow.clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, weekRow, club}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
  async checkAuth_RecordWrite(where: string, jwtPayload: T.JwtPayloadType, weekOId: string) {
    const {userOId} = jwtPayload

    try {
      const {user} = await this.userDBService.readUserByUserOId(where, userOId)
      if (!user) {
        throw {
          gkd: {userErr: `유저가 DB 에 없음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_USER',
          gkdErrMsg: `유저가 DB 에 없음`,
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {weekRow} = await this.weekRecordDBService.readWeekRowByWeekOId(where, weekOId)
      if (!weekRow) {
        throw {
          gkd: {weekRowErr: `주간 기록이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_WEEK_ROW',
          gkdErrMsg: `주간 기록이 존재하지 않음`,
          gkdStatus: {weekOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const {club} = await this.clubDBService.readClubByClubOId(where, weekRow.clubOId)
      if (!club) {
        throw {
          gkd: {clubErr: `클럽이 존재하지 않음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_CLUB',
          gkdErrMsg: `클럽이 존재하지 않음`,
          gkdStatus: {clubOId: weekRow.clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      if (user.commAuth !== AUTH_ADMIN && !(user.commOId === club.commOId && user.commAuth >= AUTH_SILVER)) {
        throw {
          gkd: {userErr: `권한이 없음`},
          gkdErrCode: 'DBHUB_CHECK_RECORD_AUTH_NO_AUTHORITY',
          gkdErrMsg: `권한이 없음`,
          gkdStatus: {userOId, commAuth: user.commAuth, clubOId: weekRow.clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      return {user, weekRow, club}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
