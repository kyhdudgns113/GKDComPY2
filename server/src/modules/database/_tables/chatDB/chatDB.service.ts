import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class ChatDBService {
  constructor(private readonly dbService: DBService) {}

  // GET AREA:

  async readChatArrByClubOId(where: string, clubOId: string, lastChatIdx: number) {
    const connection = await this.dbService.getConnection()
    /**
     * readChatArrByClubOId
     * - 해당 클럽의 채팅 배열 읽기 함수
     *
     * 입력값
     * - clubOId: string
     *     + 클럽의 OId
     * - lastChatIdx: number
     *     + 마지막 채팅 인덱스
     *
     * 출력값
     * - chatArr: T.ChatType[]
     *     + 해당 클럽의 채팅 배열
     *
     * 작동
     * - lastChatIdx 가 0 이상이면 해당 인덱스 이전 10개를 읽는다
     * - lastChatIdx 가 -1 이면 마지막 10개를 읽는다
     */
    try {
      // 1. clubOId로 chatRoomOId 찾기
      const [chatRoomRows] = await connection.query<RowDataPacket[]>(`SELECT chatRoomOId FROM chatRooms WHERE clubOId = ?`, [clubOId])

      if (!chatRoomRows || chatRoomRows.length === 0) {
        throw {
          gkd: {invalid: 'clubOId 가 존재하지 않는다'},
          gkdErrCode: 'CHATDB_READ_CHAT_ARR_BY_CLUB_O_ID_INVALID',
          gkdErrMsg: 'clubOId 가 존재하지 않는다',
          gkdStatus: {clubOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const chatRoomOId = chatRoomRows[0].chatRoomOId

      // 2. lastChatIdx에 따라 채팅 배열 읽기
      let query: string
      let params: any[]

      if (lastChatIdx === -1) {
        // 마지막 10개 읽기
        query = `
          SELECT 
            c.chatIdx, 
            c.date, 
            c.userId, 
            c.userOId, 
            c.content 
          FROM chats c
          WHERE c.chatRoomOId = ? 
          ORDER BY c.chatIdx DESC 
          LIMIT 10
        `
        params = [chatRoomOId]
      } // ::
      else if (lastChatIdx >= 0) {
        // lastChatIdx 이전 10개 읽기
        query = `
          SELECT 
            c.chatIdx, 
            c.date, 
            c.userId, 
            c.userOId, 
            c.content 
          FROM chats c
          WHERE c.chatRoomOId = ? AND c.chatIdx < ? 
          ORDER BY c.chatIdx DESC 
          LIMIT 10
        `
        params = [chatRoomOId, lastChatIdx]
      } // ::
      else {
        throw {
          gkd: {invalid: 'lastChatIdx 가 -1 이상이어야 한다'},
          gkdErrCode: 'CHATDB_READ_CHAT_ARR_BY_CLUB_O_ID_INVALID',
          gkdErrMsg: 'lastChatIdx 가 -1 이상이어야 한다',
          gkdStatus: {clubOId, lastChatIdx},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      const [chatRows] = await connection.query<RowDataPacket[]>(query, params)

      // 3. 결과를 ChatType 형식으로 변환 (DESC로 가져왔으므로 역순으로)
      const chatArr = (chatRows || []).reverse().map(row => ({
        chatIdx: row.chatIdx,
        clubOId: clubOId,
        contents: row.content,
        createdAt: row.date,
        userId: row.userId,
        userOId: row.userOId
      })) as T.ChatType[]

      return {chatArr}
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
