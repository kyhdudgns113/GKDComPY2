import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class EMemberDBService {
  constructor(private readonly dbService: DBService) {}

  async createOrUpdateEMembers(where: string, commOId: string, eMemberArr: T.EMemberType[]) {
    /**
     * createOrUpdateEMembers
     * - 공동체의 전체 멤버 정보를 생성하거나 업데이트한다.
     *
     * 입력값
     * - commOId: string
     *     + 공동체의 OId
     * - eMemberArr: T.EMemberType[]
     *     + 저장할 전체 멤버 배열
     *
     * 출력값
     * - success: boolean
     *     + 저장 성공 여부
     *
     * 작동 순서
     * 1. 기존 eMembers 삭제 뙇!!
     * 2. 새로운 eMembers 삽입 뙇!!
     * 3. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()

    try {
      // 1. 기존 eMembers 삭제 뙇!!
      const queryDelete = `DELETE FROM eMembers WHERE commOId = ?`
      const paramDelete = [commOId]
      await connection.execute(queryDelete, paramDelete)

      // 2. 새로운 eMembers 삽입 뙇!!
      if (eMemberArr.length > 0) {
        const queryInsert = `
          INSERT INTO eMembers (commOId, memName, clubOId, prevClubOId, batterPower, pitcherPower, position)
          VALUES ${eMemberArr.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ')}
        `
        const paramInsert = eMemberArr.flatMap(eMember => {
          return [commOId, eMember.memName, eMember.clubOId, eMember.prevClubOId, eMember.batterPower, eMember.pitcherPower, eMember.position]
        })
        await connection.execute(queryInsert, paramInsert)
      }

      // 3. 리턴 뙇!!
      return {success: true}
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

  async readEMemberArrByCommOId(where: string, commOId: string) {
    /**
     * readEMemberArrByCommOId
     * - 공동체의 전체 멤버 정보를 읽어온다.
     *
     * 입력값
     * - commOId: string
     *     + 공동체의 OId
     *
     * 출력값
     * - eMemberArr: T.EMemberType[]
     *     + 전체 멤버 배열
     *
     * 작동 순서
     * 1. eMembers 조회 뙇!!
     * 2. 결과를 T.EMemberType[] 타입으로 변환 뙇!!
     * 3. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()

    try {
      // 1. eMembers 조회 뙇!!
      const query = `SELECT * FROM eMembers WHERE commOId = ? ORDER BY clubOId, position ASC`
      const param = [commOId]
      const [rows] = await connection.execute(query, param)
      const resultArray = rows as RowDataPacket[]

      if (resultArray.length === 0) {
        return {eMemberArr: []}
      }

      // 2. 결과를 T.EMemberType[] 타입으로 변환 뙇!!
      const eMemberArr: T.EMemberType[] = resultArray.map(row => ({
        batterPower: row.batterPower,
        clubOId: row.clubOId,
        memName: row.memName,
        pitcherPower: row.pitcherPower,
        position: row.position,
        prevClubOId: row.prevClubOId
      }))

      // 3. 리턴 뙇!!
      return {eMemberArr}
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
