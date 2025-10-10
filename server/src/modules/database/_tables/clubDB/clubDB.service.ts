import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as T from '@type'
import * as U from '@util'

@Injectable()
export class ClubDBService {
  constructor(private readonly dbService: DBService) {}

  async createClub(where: string, dto: DTO.CreateClubDTO) {
    /**
     * createClub
     * - 클럽 생성 함수
     *
     * 입력값
     * - commOId: string
     *     + 공동체의 OId
     * - clubName: string
     *     + 클럽의 이름
     * - clubIdx: number
     *     + 클럽의 인덱스
     *
     * 출력값
     * - club: T.ClubType
     *     + 생성된 클럽 정보
     *
     * 작동 순서
     * 1. OId 들 중복체크 및 재생성
     *     1. clubOId
     *     2. chatRoomOId
     *     3. docOId
     * 2. 클럽 생성 쿼리 뙇!!
     * 3. 채팅방 생성 쿼리 뙇!!
     * 4. 클럽 문서 생성 쿼리 뙇!!
     * 5. ClubType 형태로 반환 뙇!!
     * 6. 리턴 뙇!!
     */
    const {commOId, clubName, clubIdx} = dto

    let clubOId = U.generateObjectId()
    let chatRoomOId = U.generateObjectId()
    let docOId = U.generateObjectId()

    const connection = await this.dbService.getConnection()
    try {
      // 1-1. clubOId 중복체크 및 재생성
      while (true) {
        const queryRead = 'SELECT clubOId FROM clubs WHERE clubOId = ?'
        const paramRead = [clubOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        clubOId = U.generateObjectId()
      }

      // 1-2. chatRoomOId 중복체크 및 재생성
      while (true) {
        const queryRead = 'SELECT chatRoomOId FROM chatRooms WHERE chatRoomOId = ?'
        const paramRead = [chatRoomOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        chatRoomOId = U.generateObjectId()
      }

      // 1-3. docOId 중복체크 및 재생성
      while (true) {
        const queryRead = 'SELECT docOId FROM docs WHERE docOId = ?'
        const paramRead = [docOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        docOId = U.generateObjectId()
      }

      // 2. 클럽 생성 쿼리 뙇!!
      const queryClub = 'INSERT INTO clubs (clubOId, chatRoomOId, clubIdx, clubName, commOId, docOId) VALUES (?, ?, ?, ?, ?, ?)'
      const paramClub = [clubOId, chatRoomOId, clubIdx, clubName, commOId, docOId]
      await connection.execute(queryClub, paramClub)

      // 3. 채팅방 생성 쿼리 뙇!!
      const queryChatRoom = 'INSERT INTO chatRooms (chatRoomOId, clubOId) VALUES (?, ?)'
      const paramChatRoom = [chatRoomOId, clubOId]
      await connection.execute(queryChatRoom, paramChatRoom)

      // 4. 클럽 문서 생성 쿼리 뙇!!
      const queryDoc = 'INSERT INTO docs (docOId, clubOId) VALUES (?, ?)'
      const paramDoc = [docOId, clubOId]
      await connection.execute(queryDoc, paramDoc)

      // 5. ClubType 형태로 반환 뙇!!
      const club: T.ClubType = {
        clubOId,
        clubName,
        commOId
      }

      // 6. 리턴 뙇!!
      return {club}
      // ::
    } catch (errObj) {
      // ::
      // 생성했던것 전부 지운다
      const queryDeleteChatRoom = 'DELETE FROM chatRooms WHERE chatRoomOId = ?'
      const paramDeleteChatRoom = [chatRoomOId]
      await connection.execute(queryDeleteChatRoom, paramDeleteChatRoom)

      const queryDeleteDoc = 'DELETE FROM docs WHERE docOId = ?'
      const paramDeleteDoc = [docOId]
      await connection.execute(queryDeleteDoc, paramDeleteDoc)

      const queryDelete = 'DELETE FROM clubs WHERE clubOId = ?'
      const paramDelete = [clubOId]
      await connection.execute(queryDelete, paramDelete)

      if (errObj.errno === 1062) {
        throw {
          gkd: {duplicate: `${commOId} 에서 클럽 이름 중복임. ${clubName} 이미 있음`},
          gkdErrCode: 'CLUBDB_CREATE_CLUB_DUPLICATE',
          gkdErrMsg: `클럽 이름 중복임. ${clubName} 이미 있음`,
          gkdStatus: {commOId, clubName},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async readClubArrByCommOId(where: string, commOId: string) {
    /**
     * readClubArrByCommOId
     * - 해당 공동체에 속한 클럽들의 배열 읽기 함수
     *
     * 입력값
     * - commOId: string
     *     + 공동체의 OId
     *
     * 출력값
     * - clubArr: T.ClubType[]
     *     + 해당 공동체에 속한 클럽들의 배열
     *
     * 작동 순서
     * 1. 클럽 읽기 쿼리 뙇!! (인덱스 낮은것부터 순서대로 읽어온다)
     *     - clubIdx 가 0 이상이어야 한다.
     *     - 음수는 후보군, 탈퇴멤버 클럽이다
     * 2. 클럽 배열타입으로 변환 뙇!!
     * 3. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()
    try {
      // 1. 클럽 읽기 쿼리 뙇!! (인덱스 낮은것부터 순서대로 읽어온다)
      const queryRead = `
        SELECT * FROM clubs WHERE commOId = ? AND clubIdx >= 0 ORDER BY clubIdx ASC
      `
      const paramRead = [commOId]
      const [resultRows] = await connection.execute(queryRead, paramRead)
      const resultArray = resultRows as RowDataPacket[]

      if (resultArray.length === 0) {
        return {clubArr: []}
      }

      // 2. 클럽 배열타입으로 변환 뙇!!
      const clubArr: T.ClubType[] = resultArray.map(row => {
        const elem: T.ClubType = {
          clubOId: row.clubOId,
          clubName: row.clubName,
          commOId: row.commOId
        }
        return elem
      })

      // 3. 리턴 뙇!!
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
}
