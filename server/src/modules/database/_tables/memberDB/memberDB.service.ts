import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class MemberDBService {
  constructor(private readonly dbService: DBService) {}

  async readClubMemberArrByClubOId(where: string, clubOId: string) {
    /**
     * readClubMemberArrByClubOId
     * - 해당 클럽에 속한 멤버들의 배열을 읽어온다.
     *
     * 입력값
     * - clubOId: string
     *     + 클럽의 OId
     *
     * 출력값
     * - clubMemberArr: T.MemberType[]
     *     + 해당 클럽에 속한 멤버들의 배열
     *
     * 작동 순서
     * 1. LEFT JOIN으로 members와 cards를 한 번에 조회 뙇!!
     * 2. 결과를 그룹화하여 멤버 배열타입으로 변환 뙇!!
     * 3. 전투력 (타자력 + 투수력) 높은게 0번째로 오도록 정렬 뙇!!
     * 4. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()
    try {
      // 1. LEFT JOIN으로 members와 cards를 한 번에 조회 뙇!!
      const query = `
        SELECT 
          m.memOId, m.batterPower, m.clubOId, m.commOId, 
          m.memberComment, m.memName, m.position, m.pitcherPower,
          c.cardName, c.posIdx, 
          c.skillIdx0, c.skillIdx1, c.skillIdx2,
          c.skillLevel0, c.skillLevel1, c.skillLevel2
        FROM members m
        LEFT JOIN cards c ON m.memOId = c.memOId
        WHERE m.clubOId =  ?
        ORDER BY m.memOId, c.posIdx ASC
      `
      const param = [clubOId]
      const [rows] = await connection.execute(query, param)
      const resultArray = rows as RowDataPacket[]

      if (resultArray.length === 0) {
        return {clubMemberArr: []}
      }

      // 2. 결과를 그룹화하여 멤버 배열타입으로 변환 뙇!!
      const memberMap = new Map<string, T.MemberType>()

      resultArray.forEach(row => {
        const memOId = row.memOId

        // 멤버가 아직 Map에 없으면 추가
        if (!memberMap.has(memOId)) {
          memberMap.set(memOId, {
            batterPower: row.batterPower,
            clubOId: row.clubOId,
            commOId: row.commOId,
            deck: [],
            lastRecorded: null,
            memberComment: row.memberComment,
            memOId: row.memOId,
            memName: row.memName,
            position: row.position,
            pitcherPower: row.pitcherPower
          })
        }

        // 카드 정보가 있으면 deck에 추가 (LEFT JOIN이라 카드가 없을 수도 있음)
        if (row.posIdx !== null) {
          const member = memberMap.get(memOId)!
          member.deck.push({
            name: row.cardName,
            posIdx: row.posIdx,
            skillIdxs: [row.skillIdx0, row.skillIdx1, row.skillIdx2],
            skillLevels: [row.skillLevel0, row.skillLevel1, row.skillLevel2]
          })
        }
      })

      // 3. 전투력 (타자력 + 투수력) 높은게 0번째로 오도록 정렬 뙇!!
      const clubMemberArr = Array.from(memberMap.values())
      clubMemberArr.sort((a, b) => b.pitcherPower + b.batterPower - (a.pitcherPower + a.batterPower))

      // 4. 리턴 뙇!!
      return {clubMemberArr}
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
