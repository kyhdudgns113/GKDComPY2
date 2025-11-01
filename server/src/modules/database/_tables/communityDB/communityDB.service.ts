import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as SV from '@shareValue'
import * as T from '@type'
import * as U from '@util'

@Injectable()
export class CommunityDBService {
  constructor(private readonly dbService: DBService) {}

  async createCommunity(where: string, dto: DTO.CreateCommunityAdminDTO) {
    /**
     * createCommunity
     * - 공동체 생성 함수
     *
     * 입력값
     * - commName: string
     *   - 공동체 이름
     *
     * 출력값
     * - community: T.CommunityType
     *   - 생성된 공동체 정보
     *
     * 작동 순서
     * 1. commOId 중복 체크 및 재생
     * 2. banClubOId 중복 체크 및 재생
     * 3. subClubOId 중복 체크 및 재생
     * 4. banChatRoomOId 중복 체크 및 재생
     * 5. subChatRoomOId 중복 체크 및 재생
     * 6. 공동체 생성 뙇!!
     * 7. 후보군 클럽 생성 뙇!!
     * 8. 탈퇴 클럽 생성 뙇!!
     * 9. 후보군 클럽 채팅방 생성 뙇!!
     * 10. 탈퇴 클럽 채팅방 생성 뙇!!
     * 11. CommunityType 형태로 반환 뙇!!
     */
    const {commName} = dto
    const connection = await this.dbService.getConnection()

    let commOId = U.generateObjectId()
    let banClubOId = U.generateObjectId()
    let subClubOId = U.generateObjectId()
    let banChatRoomOId = U.generateObjectId()
    let subChatRoomOId = U.generateObjectId()

    try {
      // 1. commOId 중복 체크 및 재생
      while (true) {
        const queryRead = 'SELECT commOId FROM communities WHERE commOId = ?'
        const paramRead = [commOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        commOId = U.generateObjectId()
      }

      // 2. banClubOId 중복 체크 및 재생
      while (true) {
        const queryRead = 'SELECT clubOId FROM clubs WHERE clubOId = ?'
        const paramRead = [banClubOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        banClubOId = U.generateObjectId()
      }

      // 3. subClubOId 중복 체크 및 재생
      while (true) {
        const queryRead = 'SELECT clubOId FROM clubs WHERE clubOId = ?'
        const paramRead = [subClubOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        subClubOId = U.generateObjectId()
      }

      // 4. banChatRoomOId 중복 체크 및 재생
      while (true) {
        const queryRead = 'SELECT chatRoomOId FROM chatRooms WHERE chatRoomOId = ?'
        const paramRead = [banChatRoomOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        banChatRoomOId = U.generateObjectId()
      }

      // 5. subChatRoomOId 중복 체크 및 재생
      while (true) {
        const queryRead = 'SELECT chatRoomOId FROM chatRooms WHERE chatRoomOId = ?'
        const paramRead = [subChatRoomOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        subChatRoomOId = U.generateObjectId()
      }

      // 6. 공동체 생성 뙇!!
      const maxUsers = SV.DEFAULT_MAX_USERS
      const maxClubs = SV.DEFAULT_MAX_CLUBS
      const queryComm = 'INSERT INTO communities (commOId, banClubOId, commName, maxUsers, maxClubs, subClubOId) VALUES (?, ?, ?, ?, ?, ?)'
      const paramComm = [commOId, banClubOId, commName, maxUsers, maxClubs, subClubOId]
      await connection.execute(queryComm, paramComm)

      // 7. 후보군 클럽 생성 뙇!!
      const subClubIdx = -1
      const querySubClub = 'INSERT INTO clubs (clubOId, chatRoomOId, clubIdx, clubName, commOId, docOId) VALUES (?, ?, ?, ?, ?, ?)'
      const paramSubClub = [subClubOId, subClubOId, subClubIdx, '후보군', commOId, subClubOId]
      await connection.execute(querySubClub, paramSubClub)

      // 8. 탈퇴 멤버 클럽 생성 뙇!!
      const banClubIdx = -2
      const queryBanClub = 'INSERT INTO clubs (clubOId, chatRoomOId, clubIdx, clubName, commOId, docOId) VALUES (?, ?, ?, ?, ?, ?)'
      const paramBanClub = [banClubOId, banClubOId, banClubIdx, '탈퇴', commOId, banClubOId]
      await connection.execute(queryBanClub, paramBanClub)

      // 9. 후보군 클럽 채팅방 생성 뙇!!
      const querySubChatRoom = 'INSERT INTO chatRooms (chatRoomOId, clubOId) VALUES (?, ?)'
      const paramSubChatRoom = [subChatRoomOId, subClubOId]
      await connection.execute(querySubChatRoom, paramSubChatRoom)

      // 10. 탈퇴 클럽 채팅방 생성 뙇!!
      const queryBanChatRoom = 'INSERT INTO chatRooms (chatRoomOId, clubOId) VALUES (?, ?)'
      const paramBanChatRoom = [banChatRoomOId, banClubOId]
      await connection.execute(queryBanChatRoom, paramBanChatRoom)

      // 11. CommunityType 형태로 반환 뙇!!
      const community: T.CommunityType = {
        commOId,
        commName,
        maxUsers,
        maxClubs,
        banClubOId,
        subClubOId
      }
      return {community}
      // ::
    } catch (errObj) {
      // ::
      if (errObj.errno === 1062) {
        throw {
          gkd: {duplicate: `공동체 이름 중복임. ${commName} 이미 있음`},
          gkdErrCode: 'COMMUNITYDB_CREATE_COMMUNITY_DUPLICATE',
          gkdErrMsg: `공동체 이름 중복임. ${commName} 이미 있음`,
          gkdStatus: {commName},
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

  async readCommunityArr(where: string): Promise<{commArr: T.CommunityType[]}> {
    /**
     * readCommunityArr
     * - 전체 공동체들을 배열 형태로 읽어온다.
     *
     * 출력
     * - commArr: T.CommunityType[]
     *
     * 작동 순서
     * 1. 공동체 정보들을 읽기 뙇!!
     * 2. CommunityType[] 형태로 변환 뙇!!
     * 3. 사전순으로 정렬 뙇!!
     * 4. 반환 뙇!!
     */

    const connection = await this.dbService.getConnection()

    try {
      // 1. 공동체 정보들을 읽기 뙇!!
      const query = `
        SELECT * FROM communities
      `
      const param: any[] = []
      const [rows] = await connection.query<RowDataPacket[]>(query, param)

      if (rows.length === 0) {
        return {commArr: []}
      }

      // 2. CommunityType[] 형태로 변환 뙇!!
      const commArr: T.CommunityType[] = rows.map(row => {
        const elem: T.CommunityType = {
          commOId: row.commOId,
          commName: row.commName,
          maxUsers: row.maxUsers,
          maxClubs: row.maxClubs,
          banClubOId: row.banClubOId,
          subClubOId: row.subClubOId
        }
        return elem
      })

      // 3. 사전순으로 정렬 뙇!!
      commArr.sort((a, b) => a.commName.localeCompare(b.commName))

      // 4. 반환 뙇!!
      return {commArr}
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
  async readCommunityByCommOId(where: string, commOId: string) {
    /**
     * readCommunityByCommOId
     * - 해당 공동체의 정보를 읽어온다.
     */

    const connection = await this.dbService.getConnection()

    try {
      // 1. 공동체 정보 읽기(해당 공동체에 속한 클럽들의 clubOId들도 clubIdx 가 0이상인것만 크기순으로 정렬해서 읽기)
      const queryRead = `
        SELECT commName, maxUsers, maxClubs, banClubOId, subClubOId FROM communities 
          WHERE commOId = ?
      `
      const paramRead = [commOId]
      const [resultRows] = await connection.execute(queryRead, paramRead)
      const resultArray = resultRows as RowDataPacket[]

      if (resultArray.length === 0) {
        return {community: null}
      }

      const {commName, maxUsers, maxClubs, banClubOId, subClubOId} = resultArray[0]

      const community: T.CommunityType = {commOId, commName, maxUsers, maxClubs, banClubOId, subClubOId}
      return {community}
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
  async readCommunityDocument(where: string, commOId: string) {
    const connection = await this.dbService.getConnection()
    try {
      const queryRead = 'SELECT contents FROM commDocs WHERE commOId = ?'
      const paramRead = [commOId]
      const [resultRows] = await connection.execute(queryRead, paramRead)
      const resultArray = resultRows as RowDataPacket[]

      if (resultArray.length === 0) {
        const queryCreate = 'INSERT INTO commDocs (commOId, contents) VALUES (?, ?)'
        const paramCreate = [commOId, '']
        await connection.execute(queryCreate, paramCreate)
        return {contents: ''}
      } // ::
      else {
        const {contents} = resultArray[0]
        return {contents}
      } // ::
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

  async updateCommunityDocument(where: string, dto: DTO.UpdateCommDocDTO) {
    const connection = await this.dbService.getConnection()
    try {
      const {commOId, contents} = dto
      const queryUpdate = 'UPDATE commDocs SET contents = ? WHERE commOId = ?'
      const paramUpdate = [contents, commOId]
      await connection.execute(queryUpdate, paramUpdate)
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
