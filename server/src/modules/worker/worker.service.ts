import {Injectable, OnApplicationBootstrap} from '@nestjs/common'
import {Cron} from '@nestjs/schedule'
import {JwtPayloadType} from '@type'
import {ChatDBService, ClubDBService, CommunityDBService, GDocumentDBService, MemberDBService, UserDBService} from '@modules/mongoDB'
import {DBService} from '@modules/database/_tables/_db'
import {connection, Types} from 'mongoose'

import * as S from '@secret'
import * as ST from '@shareType'
import * as U from '@util'

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

      await Promise.all(
        communityArr.map(async _community => {
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
      )
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

      await Promise.all(
        clubArr.map(async _club => {
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
      )

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

      await Promise.all(
        userArr.map(async _user => {
          const query = `
            INSERT INTO users
            (userOId, userId, commAuth, commOId, hashedPassword)
            VALUES (?, ?, ?, ?, ?)
          `
          const param = [(_user._id as Types.ObjectId).toString(), _user.id, S.AUTH_GOLD, _user.commOId, _user.hashedPassword]
          await connection.execute(query, param)
        })
      )

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

      await Promise.all(
        chatRoomArr.map(async _chatRoom => {
          const query = `
            INSERT INTO chatRooms
            (chatRoomOId, clubOId, numChat)
            VALUES (?, ?, ?)
          `
          const param = [(_chatRoom._id as Types.ObjectId).toString(), _chatRoom.clubOId, _chatRoom.length]

          await connection.execute(query, param)

          await Promise.all(
            _chatRoom.chatsArr.map(async (_chat, chatIdx) => {
              const query = `
                INSERT INTO chats
                (chatIdx, chatRoomOId, date, userId, userOId, content)
                VALUES (?, ?, ?, ?, ?, ?)
              `
              const param = [chatIdx, (_chatRoom._id as Types.ObjectId).toString(), _chat.date, _chat.id, _chat.uOId, _chat.content]
              await connection.execute(query, param)
            })
          )
        })
      )

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

      console.log(`    - members 테이블 생성 시작`)

      const valMemArr: string[] = []
      const valMemParams: any[] = []

      memberArr.forEach(async _member => {
        valMemArr.push(`(?, ?, ?, ?, ?, ?, ?, ?)`)
        valMemParams.push(
          (_member._id as Types.ObjectId).toString(),
          _member.commOId,
          _member.clubOId,
          _member.name,
          _member.batterPower,
          _member.pitcherPower,
          _member.memberComment,
          _member.position
        )
      })

      if (valMemArr.length > 0) {
        const queryMem = `
          INSERT INTO members
          (memOId, commOId, clubOId, memName, batterPower, pitcherPower, memberComment, position)
          VALUES ${valMemArr.join(', ')}
        `
        await connection.execute(queryMem, valMemParams)
      }

      console.log(`    - cards 테이블 생성 시작`)

      const valCardArr: string[] = []
      const valCardParams: any[] = []

      memberArr.forEach(async _member => {
        _member.deck.forEach(async _card => {
          valCardArr.push(`(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
          valCardParams.push(
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
          )
        })
      })

      if (valCardArr.length > 0) {
        const queryCard = ` 
          INSERT INTO cards
          (memOId, cardName, cardNumber, posIdx, skillIdx0, skillIdx1, skillIdx2, skillLevel0, skillLevel1, skillLevel2)
          VALUES ${valCardArr.join(', ')}
        `
        await connection.execute(queryCard, valCardParams)
      }

      console.log(`    - cards 테이블 생성 완료`)

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

      await Promise.all(
        gDocumentArr.map(async _gDocument => {
          const query = `
            INSERT INTO docs
            (docOId, clubOId, contents)
            VALUES (?, ?, ?)
          `
          const param = [(_gDocument._id as Types.ObjectId).toString(), _gDocument.clubOId, _gDocument.contents]
          await connection.execute(query, param)
        })
      )

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

    console.log(`[Worker]: loadWeeklyDB 시작 `)

    try {
      const {weeklyRecordArr} = await this.weeklyMongoService.readWeeklyRecordArr()
      const {dailyRecordArr} = await this.dailyMongoService.readDailyRecordArr()

      console.log(`    - weekRows 테이블 생성 시작`)
      // weekRows 테이블 생성
      await Promise.all(
        clubArr.map(async _club => {
          await Promise.all(
            _club.weekRowsArr.map(async _weekRow => {
              const weekOId = _weekRow.weekOId
              const clubOId = (_club._id as Types.ObjectId).toString()
              const weeklyRecord = weeklyRecordArr.find(
                weeklyRecord => weeklyRecord.clubOId === clubOId && weeklyRecord.start === _weekRow.start && weeklyRecord.end === _weekRow.end
              )
              const arrIdx = weeklyRecordArr.findIndex(
                weeklyRecord => weeklyRecord.clubOId === clubOId && weeklyRecord.start === _weekRow.start && weeklyRecord.end === _weekRow.end
              )
              const weekComments = weeklyRecord?.comment || ''
              if (!weeklyRecord) {
                console.log(`  [WeekRows] 주간 기록이 없습니다. clubOId: ${clubOId}, start: ${_weekRow.start}, end: ${_weekRow.end}`)
                return
              }

              weeklyRecordArr[arrIdx].weekOId = weekOId

              const query = `
                INSERT INTO weekRows
                (weekOId, clubOId, startDateVal, endDateVal, title, weekComments)
                VALUES (?, ?, ?, ?, ?, ?)
              `
              const param = [weekOId, clubOId, _weekRow.start, _weekRow.end, _weekRow.start, weekComments]
              await connection.execute(query, param)
            })
          )
        })
      )

      // rowMemberInfos 테이블 생성
      console.log(`    - rowMemberInfos 테이블 생성 시작`)

      // rowMemberInfos 테이블 생성 - 수정된 버전
      const allRowValues: string[] = []
      const allRowParams: any[] = []

      weeklyRecordArr.forEach(_weeklyRecord => {
        const {rowInfo, weekOId} = _weeklyRecord
        rowInfo.membersInfo.forEach(memberInfo => {
          allRowValues.push(`(?, ?, ?, ?, ?, ?)`)
          allRowParams.push(
            memberInfo.batterPower || 0,
            memberInfo.memOId,
            memberInfo.pitcherPower || 0,
            memberInfo.position,
            memberInfo.name,
            weekOId
          )
        })
      })

      if (allRowValues.length > 0) {
        const queryRow = `
          INSERT INTO rowMemberInfos
          (batterPower, memOId, pitcherPower, position, rowMemName, weekOId)
          VALUES ${allRowValues.join(', ')}
        `
        await connection.execute(queryRow, allRowParams)
      }

      // weekRowDateInfos 테이블 생성
      console.log(`    - weekRowDateInfos 테이블 생성 시작`)

      // weekRowDateInfos 테이블 생성 - 수정된 버전
      const allColValues: string[] = []
      const allColParams: any[] = []

      weeklyRecordArr.forEach(_weeklyRecord => {
        const {colInfo, clubOId, weekOId} = _weeklyRecord
        colInfo.dateInfo.forEach(dateInfo => {
          allColValues.push(`(?, ?, ?, ?, ?, ?, ?)`)
          allColParams.push(weekOId, clubOId, dateInfo.date, dateInfo.enemyName, dateInfo.pitchOrder || 0, dateInfo.order, dateInfo.comments)
        })
      })

      if (allColValues.length > 0) {
        const queryCol = `
          INSERT INTO weekRowDateInfos
          (weekOId, clubOId, dateVal, enemyName, pitchOrder, dailyOrder, comments)
          VALUES ${allColValues.join(', ')}
        `
        await connection.execute(queryCol, allColParams)
      }

      console.log(`    - dailyRecords 테이블 생성 시작(전체 ${dailyRecordArr.length}개)`)
      let cntDaily = 0

      // dailyRecords 테이블 생성
      // 간혹 중복된게 있기 때문에 그 에러 발생하면 그냥 넘어가야 한다.
      await Promise.all(
        dailyRecordArr.map(async _dailyRecord => {
          try {
            const weeklyRecord = weeklyRecordArr.find(
              weeklyRecord =>
                weeklyRecord.clubOId === _dailyRecord.clubOId && weeklyRecord.start <= _dailyRecord.date && weeklyRecord.end >= _dailyRecord.date
            )

            if (!weeklyRecord) {
              console.log(`  [DailyRecords] 주간 기록이 없습니다. clubOId: ${_dailyRecord.clubOId}, date: ${_dailyRecord.date}`)
              return
            }

            const weekOId = weeklyRecord.weekOId

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
            cntDaily++
            // ::
          } catch (errObj) {
            if (errObj.errno !== 1062) {
              throw errObj
            }
          }
        })
      )

      console.log(`[Worker]: loadWeeklyDB 완료`)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
      console.log(`[Worker]: loadWeeklyDB 가 연결을 종료함`)
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
