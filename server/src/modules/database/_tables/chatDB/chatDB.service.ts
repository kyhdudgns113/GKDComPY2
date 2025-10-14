import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as ST from '@shareType'
import * as T from '@type'

@Injectable()
export class ChatDBService {
  constructor(private readonly dbService: DBService) {}

  async createChat(where: string, dto: DTO.CreateChatDTO) {
    const connection = await this.dbService.getConnection()
    const {chatIdx, chatRoomOId, userId, userOId, content} = dto
    try {
      const date = new Date()

      const query = 'INSERT INTO chats (chatIdx, chatRoomOId, date, userId, userOId, content) VALUES (?, ?, ?, ?, ?, ?)'
      const param = [chatIdx, chatRoomOId, date, userId, userOId, content]
      await connection.execute(query, param)

      const chat: T.ChatType = {
        chatIdx,
        chatRoomOId,
        date,
        userId,
        userOId,
        content
      }

      // 2. 채팅방 메시지 개수 늘리기
      const queryUpdateNumChat = 'UPDATE chatRooms SET numChat = numChat + 1 WHERE chatRoomOId = ?'
      const paramUpdateNumChat = [chatRoomOId]
      await connection.execute(queryUpdateNumChat, paramUpdateNumChat)

      return {chat}
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
      const queryRoom = `SELECT chatRoomOId, numChat FROM chatRooms WHERE clubOId = ?`
      const paramRoom = [clubOId]
      const [chatRoomRows] = await connection.execute<RowDataPacket[]>(queryRoom, paramRoom)

      console.log(`  [ChatDBService] lastIdx: ${lastChatIdx}`)

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
        // 마지막 10개 읽기 (가장 큰 인덱스부터)
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

      const [chatRows] = await connection.execute<RowDataPacket[]>(query, params)

      // 3. 결과를 ChatType 형식으로 변환 (ASC로 가져왔으므로 역순으로)
      const chatArr = (chatRows || []).map(row => ({
        chatIdx: row.chatIdx,
        chatRoomOId,
        content: row.content,
        date: row.date,
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

  async readChatRoomByChatRoomOId(where: string, chatRoomOId: string) {
    const connection = await this.dbService.getConnection()
    try {
      const queryRead = `SELECT chatRoomOId, clubOId, numChat FROM chatRooms WHERE chatRoomOId = ?`
      const paramRead = [chatRoomOId]
      const [resultRows] = await connection.execute(queryRead, paramRead)
      const resultArray = resultRows as RowDataPacket[]
      if (resultArray.length === 0) {
        return {chatRoom: null}
      }

      const chatRoom: ST.ChatRoomType = {
        chatRoomOId: resultArray[0].chatRoomOId,
        clubOId: resultArray[0].clubOId,
        numChat: resultArray[0].numChat
      }
      return {chatRoom}
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
