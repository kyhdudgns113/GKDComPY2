import {Injectable, OnApplicationBootstrap} from '@nestjs/common'
import {Cron} from '@nestjs/schedule'
import {JwtPayloadType} from '@type'
import {ChatDBService, ClubDBService, CommunityDBService, GDocumentDBService, MemberDBService, UserDBService} from '@modules/mongoDB'
import {DBService} from '@modules/database/_tables/_db'
import {connection, Types} from 'mongoose'

import * as S from '@secret'
import * as ST from '@shareType'
import {WeeklyRecordDBService} from '@modules/mongoDB/schemas/weeklyRecordDB'
import {DailyRecordDBService} from '@modules/mongoDB/schemas/dailyRecordDB'
@Injectable()
export class WorkerService implements OnApplicationBootstrap {
  constructor(
    private readonly sqlService: DBService,
    private readonly chatMongoService: ChatDBService,
    private readonly clubMongoService: ClubDBService,
    private readonly commMongoService: CommunityDBService,
    private readonly dailyMongoService: DailyRecordDBService,
    private readonly docMongoService: GDocumentDBService,
    private readonly memberMongoService: MemberDBService,
    private readonly userMongoService: UserDBService,
    private readonly weeklyMongoService: WeeklyRecordDBService
  ) {}

  // AREA1: 서버 시작시 실행하는 영역
  async onApplicationBootstrap() {
    try {
      // const {communityArr} = await this.loadCommunity()
      // const {clubArr} = await this.loadClub(communityArr)
      // await this.loadUser()
      // await this.loadChatDB()
      // await this.loadMember()
      // await this.loadDocDB()
      // await this.loadWeeklyDB(clubArr)
      // ::
    } catch (errObj) {
      // ::
    }
  }

  async loadCommunity() {
    const connection = await this.sqlService.getConnection()

    console.log(`[Worker]: loadCommunity 시작`)

    try {
      const {communityArr} = await this.commMongoService.readCommunityArr()

      communityArr.forEach(async _community => {
        const query = `
          INSERT INTO communities
          (commOId, commName, maxUsers, maxClubs, banClubOId, subClubOId)
          VALUES (?, ?, ?, ?, ?, ?)
        `
        const param = [
          (_community._id as Types.ObjectId).toString(),
          _community.name,
          _community.maxUsers,
          _community.maxClubs,
          _community.banClubOId,
          _community.clubOIdsArr[0]
        ]
        await connection.execute(query, param)
      })
      console.log(`[Worker]: loadCommunity 완료`)

      return {communityArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async loadClub(communityArr: any[]) {
    console.log(`[Worker]: loadClub 시작`)
    const connection = await this.sqlService.getConnection()

    try {
      const {clubArr} = await this.clubMongoService.readClubArr()

      clubArr.forEach(async _club => {
        let comm = communityArr.find(comm => (comm._id as Types.ObjectId).toString() === _club.commOId) || null
        let clubIdx = comm?.clubOIdsArr.findIndex(clubOId => clubOId === (_club._id as Types.ObjectId).toString()) - 1 || 0
        const clubName = _club.name

        if (clubName === '후보군') {
          clubIdx = -1
        } // ::
        else if (clubName === '탈퇴') {
          clubIdx = -2
        }

        const query = `
          INSERT INTO clubs
          (clubOId, chatRoomOId, clubIdx, clubName, commOId, docOId)
          VALUES (?, ?, ?, ?, ?, ?)
        `
        const param = [(_club._id as Types.ObjectId).toString(), _club.chatRoomOId, clubIdx, _club.name, _club.commOId, _club.docOId]
        await connection.execute(query, param)
      })

      console.log(`[Worker]: loadClub 완료`)

      return {clubArr}

      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async loadUser() {
    const connection = await this.sqlService.getConnection()

    console.log(`[Worker]: loadUser 시작`)

    try {
      const {userArr} = await this.userMongoService.readUserArr()

      userArr.forEach(async _user => {
        const query = `
          INSERT INTO users
          (userOId, userId, commAuth, commOId, hashedPassword)
          VALUES (?, ?, ?, ?, ?)
        `
        const param = [(_user._id as Types.ObjectId).toString(), _user.id, S.AUTH_GOLD, _user.commOId, _user.hashedPassword]
        await connection.execute(query, param)
      })

      console.log(`[Worker]: loadUser 완료`)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async loadChatDB() {
    const connection = await this.sqlService.getConnection()

    console.log(`[Worker]: loadChatDB 시작`)

    try {
      const {chatRoomArr} = await this.chatMongoService.readChatRoomArr()

      chatRoomArr.forEach(async _chatRoom => {
        const query = `
          INSERT INTO chatRooms
          (chatRoomOId, clubOId, numChat)
          VALUES (?, ?, ?)
        `
        const param = [(_chatRoom._id as Types.ObjectId).toString(), _chatRoom.clubOId, _chatRoom.length]

        await connection.execute(query, param)

        _chatRoom.chatsArr.forEach(async (_chat, chatIdx) => {
          const query = `
            INSERT INTO chats
            (chatIdx, chatRoomOId, date, userId, userOId, content)
            VALUES (?, ?, ?, ?, ?, ?)
          `
          const param = [chatIdx, (_chatRoom._id as Types.ObjectId).toString(), _chat.date, _chat.id, _chat.uOId, _chat.content]
          await connection.execute(query, param)
        })
      })

      console.log(`[Worker]: loadChatDB 완료`)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async loadMember() {
    const connection = await this.sqlService.getConnection()

    console.log(`[Worker]: loadMember 시작`)

    try {
      const {memberArr} = await this.memberMongoService.readMemberArr()
      memberArr.forEach(async _member => {
        const query = `
          INSERT INTO members
          (memOId, commOId, clubOId, memName, batterPower, pitcherPower, memberComment, position)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `
        const param = [
          (_member._id as Types.ObjectId).toString(),
          _member.commOId,
          _member.clubOId,
          _member.name,
          _member.batterPower,
          _member.pitcherPower,
          _member.memberComment,
          _member.position
        ]
        await connection.execute(query, param)

        _member.deck.forEach(async (_card, cardIdx) => {
          const query = `
            INSERT INTO cards
            (memOId, cardName, cardNumber, posIdx, skillIdx0, skillIdx1, skillIdx2, skillLevel0, skillLevel1, skillLevel2)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `
          const param = [
            (_member._id as Types.ObjectId).toString(),
            _card.name,
            null,
            _card.posIdx,
            _card.skillIdxs[0],
            _card.skillIdxs[1],
            _card.skillIdxs[2],
            _card.skillLevels[0],
            _card.skillLevels[1],
            _card.skillLevels[2]
          ]
          await connection.execute(query, param)
        })
      })

      console.log(`[Worker]: loadMember 완료`)

      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async loadDocDB() {
    const connection = await this.sqlService.getConnection()

    console.log(`[Worker]: loadDocDB 시작`)

    try {
      const {gDocumentArr} = await this.docMongoService.readGDocumentArr()

      gDocumentArr.forEach(async _gDocument => {
        const query = `
          INSERT INTO docs
          (docOId, clubOId, contents)
          VALUES (?, ?, ?)
        `
        const param = [(_gDocument._id as Types.ObjectId).toString(), _gDocument.clubOId, _gDocument.contents]
        await connection.execute(query, param)
      })

      console.log(`[Worker]: loadDocDB 완료`)
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async loadWeeklyDB(clubArr: any[]) {
    const connection = await this.sqlService.getConnection()

    console.log(`[Worker]: loadWeeklyDB 시작`)

    try {
      const {weeklyRecordArr} = await this.weeklyMongoService.readWeeklyRecordArr()
      const {dailyRecordArr} = await this.dailyMongoService.readDailyRecordArr()

      // weekRows 테이블 생성
      clubArr.forEach(async _club => {
        _club.weekRowsArr.forEach(async _weekRow => {
          const weekOId = (_weekRow._id as Types.ObjectId).toString()
          const clubOId = (_club._id as Types.ObjectId).toString()
          const weeklyRecord = weeklyRecordArr.find(
            weeklyRecord => weeklyRecord.clubOId === clubOId && weeklyRecord.start === _weekRow.start && weeklyRecord.end === _weekRow.end
          )
          const weekComments = weeklyRecord?.comment || ''
          weeklyRecord!.weekOId = weekOId

          const query = `
            INSERT INTO weekRows
            (weekOId, clubOId, startDateVal, endDateVal, title, weekComments)
            VALUES (?, ?, ?, ?, ?, ?)
          `
          const param = [weekOId, clubOId, _weekRow.start, _weekRow.end, _weekRow.title, weekComments]
          await connection.execute(query, param)
        })
      })

      // weekRowDateInfos, rowMemberInfos 테이블 생성
      weeklyRecordArr.forEach(async _weeklyRecord => {
        const {rowInfo, colInfo, clubOId, weekOId} = _weeklyRecord

        rowInfo.membersInfo.forEach(async _memberInfo => {
          const query = `
            INSERT INTO rowMemberInfos
            (batterPower, memOId, pitcherPower, position, rowMemName, weekOId)
            VALUES (?, ?, ?, ?, ?, ?)
          `
          const param = [
            _memberInfo.batterPower || 0,
            _memberInfo.memOId,
            _memberInfo.pitcherPower || 0,
            _memberInfo.position,
            _memberInfo.name,
            weekOId
          ]
          await connection.execute(query, param)
        })

        colInfo.dateInfo.forEach(async _dateInfo => {
          const query = `
            INSERT INTO weekRowDateInfos
            (weekOId, clubOId, dateVal, enemyName, pitchOrder, dailyOrder, comments)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `
          const param = [weekOId, clubOId, _dateInfo.date, _dateInfo.enemyName, _dateInfo.pitchOrder || 0, _dateInfo.order, _dateInfo.comments]
          await connection.execute(query, param)
        })
      })

      dailyRecordArr.forEach(async _dailyRecord => {
        try {
          const weeklyRecord = weeklyRecordArr.find(
            weeklyRecord =>
              weeklyRecord.clubOId === _dailyRecord.clubOId && weeklyRecord.start === _dailyRecord.date && weeklyRecord.end === _dailyRecord.date
          )
          const weekOId = weeklyRecord!.weekOId

          const query = `
            INSERT INTO dailyRecords
            (clubOId, comment, condError, dateVal, memOId, result0, result1, result2, rowMemName, weekOId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `
          const param = [
            _dailyRecord.clubOId,
            _dailyRecord.comment,
            _dailyRecord.condError,
            _dailyRecord.date,
            _dailyRecord.memOId,
            _dailyRecord.recordsArr[0].result,
            _dailyRecord.recordsArr[1].result,
            _dailyRecord.recordsArr[2].result,
            _dailyRecord.name,
            weekOId
          ]
          await connection.execute(query, param)
          // ::
        } catch (_unusedError) {
          // DO NOTHING:
        }
      })

      console.log(`[Worker]: loadWeeklyDB 완료`)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  // AREA2: 일정 시간마다 실행하는 영역

  @Cron('0 * * * * *', {
    timeZone: 'Asia/Seoul'
  })
  everyMinute() {
    const now = new Date()
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')

    console.log(`[Worker]: 서버의 현재 시각은 ${hour}:${minute}`)
  }
}
