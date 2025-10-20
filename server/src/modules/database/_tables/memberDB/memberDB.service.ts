import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as T from '@type'

@Injectable()
export class MemberDBService {
  constructor(private readonly dbService: DBService) {}

  async createClubMember(where: string, dto: DTO.CreateClubMemberDTO) {
    const connection = await this.dbService.getConnection()
    const {commOId, clubOId, memName, batterPower, pitcherPower} = dto

    /**
     * createClubMember
     * - 클럽 멤버 생성 함수
     *
     * 입력값
     * - commOId: string
     *     + 공동체의 OId
     * - clubOId: string
     *     + 클럽의 OId
     * - memName: string
     *     + 멤버의 이름
     * - batterPower: number
     *     + 멤버의 타자력
     * - pitcherPower: number
     *     + 멤버의 투수력
     *
     * 출력값
     * - member: T.MemberType
     *     + 생성된 멤버 정보
     *
     * 작동 순서
     * 1. OId 들 중복체크 및 재생성
     * 2. 멤버 생성 쿼리 뙇!!
     * 3. 카드 25개 생성 쿼리 뙇!!
     * 4. MemberType 형태로 반환 뙇!!
     * 5. 리턴 뙇!!
     */

    let memOId = generateObjectId()

    try {
      // 1. OId 들 중복체크 및 재생성
      while (true) {
        const queryCheckMemOId = `SELECT * FROM members WHERE memOId = ?`
        const paramCheckMemOId = [memOId]
        const [rows] = await connection.execute(queryCheckMemOId, paramCheckMemOId)
        const resultArray = rows as RowDataPacket[]
        if (resultArray.length === 0) break
        memOId = generateObjectId()
      }

      // 2. 멤버 생성 쿼리 뙇!!
      const memberComment = ''
      const position = 0
      const queryCreateMember = `INSERT INTO members (memOId, commOId, clubOId, memName, batterPower, pitcherPower, memberComment, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      const paramCreateMember = [memOId, commOId, clubOId, memName, batterPower, pitcherPower, memberComment, position]
      await connection.execute(queryCreateMember, paramCreateMember)

      // 3. 카드 25개 생성 쿼리 뙇!!
      const queryCreateCards = `
        INSERT INTO cards (memOId, posIdx)
        VALUES ${Array.from({length: 25}, () => '(?, ?)').join(', ')}
      `
      const paramCreateCards = Array.from({length: 25}, (_, i) => [memOId, i]).flat()
      await connection.execute(queryCreateCards, paramCreateCards)

      // 4. MemberType 형태로 반환 뙇!!
      const member: T.MemberType = {
        batterPower,
        clubOId,
        commOId,
        deck: [],
        lastRecorded: null,
        memberComment,
        memOId,
        memName,
        position,
        pitcherPower
      }

      // member 에 deck 넣어주기
      Array.from({length: 25}, (_, i) => {
        member.deck.push({
          memOId,
          cardName: '',
          cardNumber: null,
          posIdx: i,
          skillIdxs: [0, 1, 2],
          skillLevels: [0, 0, 0]
        })
      })

      return {member}
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
          c.cardName, c.cardNumber, c.posIdx, 
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
            memOId,
            cardName: row.cardName || '',
            cardNumber: row.cardNumber,
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
  async readCommMemberArrByCommOId(where: string, commOId: string) {
    /**
     * readCommMemberArrByCommOId
     * - 해당 공동체에 속한 모든 멤버들의 배열을 읽어온다.
     *
     * 입력값
     * - commOId: string
     *     + 공동체의 OId
     *
     * 출력값
     * - commMemberArr: T.MemberType[]
     *     + 해당 공동체에 속한 모든 멤버들의 배열
     *
     * 작동 순서
     * 1. LEFT JOIN으로 members와 cards를 한 번에 조회 뙇!!
     * 2. 결과를 그룹화하여 멤버 배열타입으로 변환 뙇!!
     * 3. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()
    try {
      // 1. LEFT JOIN으로 members와 cards를 한 번에 조회 뙇!!
      const query = `
        SELECT 
          m.memOId, m.batterPower, m.clubOId, m.commOId, 
          m.memberComment, m.memName, m.position, m.pitcherPower,
          c.cardName, c.cardNumber, c.posIdx, 
          c.skillIdx0, c.skillIdx1, c.skillIdx2,
          c.skillLevel0, c.skillLevel1, c.skillLevel2
        FROM members m
        LEFT JOIN cards c ON m.memOId = c.memOId
        WHERE m.commOId = ?
        ORDER BY m.memOId, c.posIdx ASC
      `
      const param = [commOId]
      const [rows] = await connection.execute(query, param)
      const resultArray = rows as RowDataPacket[]

      if (resultArray.length === 0) {
        return {commMemberArr: []}
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
            memOId,
            cardName: row.cardName || '',
            cardNumber: row.cardNumber,
            posIdx: row.posIdx,
            skillIdxs: [row.skillIdx0, row.skillIdx1, row.skillIdx2],
            skillLevels: [row.skillLevel0, row.skillLevel1, row.skillLevel2]
          })
        }
      })

      const commMemberArr = Array.from(memberMap.values())
      // commMemberArr.sort((a, b) => b.pitcherPower + b.batterPower - (a.pitcherPower + a.batterPower))

      // 3. 리턴 뙇!!
      return {commMemberArr}
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
  async readClubMemberByMemOId(where: string, memOId: string) {
    /**
     * readClubMemberByMemOId
     * - memOId로 특정 클럽 멤버 한 명을 조회한다.
     *
     * 입력값
     * - memOId: string
     *     + 멤버의 OId
     *
     * 출력값
     * - clubMember: T.MemberType
     *     + 조회된 멤버 정보
     *
     * 작동 순서
     * 1. LEFT JOIN으로 members와 cards를 한 번에 조회 뙇!!
     * 2. 결과를 MemberType으로 변환 뙇!!
     * 3. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()
    try {
      // 1. LEFT JOIN으로 members와 cards를 한 번에 조회 뙇!!
      const query = `
        SELECT 
          m.memOId, m.batterPower, m.clubOId, m.commOId, 
          m.memberComment, m.memName, m.position, m.pitcherPower,
          c.cardName, c.cardNumber, c.posIdx, 
          c.skillIdx0, c.skillIdx1, c.skillIdx2,
          c.skillLevel0, c.skillLevel1, c.skillLevel2
        FROM members m
        LEFT JOIN cards c ON m.memOId = c.memOId
        WHERE m.memOId = ?
        ORDER BY c.posIdx ASC
      `
      const param = [memOId]
      const [rows] = await connection.execute(query, param)
      const resultArray = rows as RowDataPacket[]

      if (resultArray.length === 0) {
        throw new Error('Member not found')
      }

      // 2. 결과를 MemberType으로 변환 뙇!!
      const firstRow = resultArray[0]
      const member: T.MemberType = {
        batterPower: firstRow.batterPower,
        clubOId: firstRow.clubOId,
        commOId: firstRow.commOId,
        deck: [],
        lastRecorded: null,
        memberComment: firstRow.memberComment,
        memOId: firstRow.memOId,
        memName: firstRow.memName,
        position: firstRow.position,
        pitcherPower: firstRow.pitcherPower
      }

      // deck에 카드 정보 추가
      resultArray.forEach(row => {
        if (row.posIdx !== null) {
          member.deck.push({
            memOId,
            cardName: row.cardName || '',
            cardNumber: row.cardNumber,
            posIdx: row.posIdx,
            skillIdxs: [row.skillIdx0, row.skillIdx1, row.skillIdx2],
            skillLevels: [row.skillLevel0, row.skillLevel1, row.skillLevel2]
          })
        }
      })

      // 3. 리턴 뙇!!
      return {member}
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

  async updateClubMemberInfo(where: string, dto: DTO.UpdateMemberInfoDTO) {
    /**
     * updateClubMemberInfo
     * - 클럽 멤버의 정보를 업데이트한다.
     *
     * 입력값
     * - dto: DTO.UpdateMemberInfoDTO
     *     + memOId: string (멤버의 OId)
     *     + memName: string (멤버의 이름)
     *     + batterPower: number (타자력)
     *     + pitcherPower: number (투수력)
     *     + memberComment: string (멤버 코멘트)
     *     + position: number (포지션)
     *
     * 출력값
     * - member: T.MemberType
     *     + 업데이트된 멤버 정보
     *
     * 작동 순서
     * 1. 멤버 정보 업데이트 쿼리 뙇!!
     * 2. 업데이트된 멤버 정보 조회 뙇!!
     * 3. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()
    const {memOId, memName, batterPower, pitcherPower, memberComment, position} = dto

    try {
      // 1. 멤버 정보 업데이트 쿼리 뙇!!
      const query = `
        UPDATE members 
        SET memName = ?, batterPower = ?, pitcherPower = ?, memberComment = ?, position = ?
        WHERE memOId = ?
      `
      const param = [memName, batterPower, pitcherPower, memberComment, position, memOId]
      await connection.execute(query, param)

      // 2. 업데이트된 멤버 정보 조회 뙇!!
      const {member} = await this.readClubMemberByMemOId(where, memOId)

      // 3. 리턴 뙇!!
      return {member}
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
  async updateMemberClubOId(where: string, dto: DTO.UpdateMemberClubOIdDTO) {
    /**
     * updateMemberClubOId
     * - 멤버의 클럽을 변경한다 (클럽 이동)
     *
     * 입력값
     * - dto: DTO.UpdateMemberClubOIdDTO
     *     + memOId: string (멤버의 OId)
     *     + newClubOId: string (새로운 클럽의 OId)
     *
     * 출력값
     * - success: boolean
     *     + 업데이트 성공 여부
     *
     * 작동 순서
     * 1. 멤버의 clubOId 업데이트 쿼리 뙇!!
     * 2. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()
    const {memOId, newClubOId} = dto

    try {
      // 1. 멤버의 clubOId 업데이트 쿼리 뙇!!
      const query = `UPDATE members SET clubOId = ? WHERE memOId = ?`
      const param = [newClubOId, memOId]
      await connection.execute(query, param)

      // 2. 리턴 뙇!!
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

  async deleteClubMember(where: string, memOId: string) {
    /**
     * deleteClubMember
     * - 클럽 멤버를 삭제한다.
     *
     * 입력값
     * - memOId: string
     *     + 멤버의 OId
     *
     * 출력값
     * - success: boolean
     *     + 삭제 성공 여부
     *
     * 작동 순서
     * 1. 멤버 삭제 쿼리 뙇!! (CASCADE로 카드도 자동 삭제됨)
     * 2. 리턴 뙇!!
     */
    const connection = await this.dbService.getConnection()
    try {
      // 1. 멤버 삭제 쿼리 뙇!! (CASCADE로 카드도 자동 삭제됨)
      const query = `DELETE FROM members WHERE memOId = ?`
      const param = [memOId]
      await connection.execute(query, param)

      // 2. 리턴 뙇!!
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
}
