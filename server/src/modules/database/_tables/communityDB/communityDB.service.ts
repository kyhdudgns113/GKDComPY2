import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class CommunityDBService {
  constructor(private readonly dbService: DBService) {}

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
     *     - 해당 공동체에 속한 클럽들의 clubOId 들도 가져오되, clubIdx 순으로 정렬해서 읽기 뙇!!
     * 2. CommunityType[] 형태로 변환 뙇!!
     * 3. 사전순으로 정렬 뙇!!
     * 4. 반환 뙇!!
     */

    const connection = await this.dbService.getConnection()

    try {
      // 1. 공동체 정보들을 읽기 뙇!! (해당 공동체에 속한 클럽들의 clubOId들도 clubIdx 순으로 정렬해서 읽기)
      const query = `
        SELECT 
          c.commOId,
          c.commName,
          c.maxUsers,
          c.maxClubs,
          c.banClubOId,
          c.subClubOId,
          GROUP_CONCAT(cl.clubOId ORDER BY cl.clubIdx ASC) AS clubOIds
        FROM communities c
        LEFT JOIN clubs cl ON c.commOId = cl.commOId
        GROUP BY c.commOId, c.commName, c.maxUsers, c.maxClubs, c.banClubOId, c.subClubOId
      `
      const param: any[] = []
      const [rows] = await connection.query<RowDataPacket[]>(query, param)

      if (rows.length === 0) {
        return {commArr: []}
      }

      // 2. CommunityType[] 형태로 변환 뙇!!
      const commArr: T.CommunityType[] = rows.map(row => ({
        commOId: row.commOId,
        commName: row.commName,
        maxUsers: row.maxUsers,
        maxClubs: row.maxClubs,
        banClubOId: row.banClubOId,
        subClubOId: row.subClubOId,
        clubOIdsArr: row.clubOIds ? row.clubOIds.split(',') : []
      }))

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
}
