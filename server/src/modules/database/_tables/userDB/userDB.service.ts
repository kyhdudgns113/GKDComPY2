import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {DBService} from '../_db'

import * as bcrypt from 'bcrypt'
import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as ST from '@shareType'
import * as T from '@type'
import * as U from '@util'
import {ADMIN_USER_ID, AUTH_ADMIN, AUTH_NORMAL, AUTH_SILVER, gkdSaltOrRounds} from '@secret'

@Injectable()
export class UserDBService {
  constructor(private readonly dbService: DBService) {}

  async createUser(where: string, dto: DTO.CreateUserDTO) {
    /**
     * createUser
     * - 사용자 계정생성 함수
     *
     * 입력값
     * - userId: string
     *     + 사용자 ID
     * - password: string
     *     + 사용자 비밀번호
     *
     * 출력값
     * - User 타입 데이터
     *
     * 작동 순서
     * 1. 중복없는 userOId 생성
     * 2. 비밀번호 bcrypt 화
     * 3. 데이터베이스에 저장
     * 4. User 타입 데이터 반환
     */
    const {commOId, userId, password} = dto
    const connection = await this.dbService.getConnection()
    let userOId = U.generateObjectId()

    try {
      // 1. userOId 중복 체크 및 재생성
      while (true) {
        const queryRead = 'SELECT userOId FROM users WHERE userOId = ?'
        const paramRead = [userOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        userOId = U.generateObjectId()
      }

      // 2. 비밀번호 bcrypt 해시화
      const hashedPassword = await bcrypt.hash(password, gkdSaltOrRounds)

      // 3. 데이터베이스에 저장
      const queryInsert = `INSERT INTO users (userOId, userId, hashedPassword, commAuth, commOId) VALUES (?, ?, ?, ?, ?)`
      const paramInsert = [userOId, userId, hashedPassword, AUTH_SILVER, commOId]
      await connection.execute(queryInsert, paramInsert)

      // 4. User 타입 데이터 반환
      const user: ST.UserType = {
        commAuth: AUTH_NORMAL,
        commOId,
        userOId,
        userId
      }
      return {user}
      // ::
    } catch (errObj) {
      // ::
      if (errObj.errno === 1062) {
        throw {
          gkd: {duplicate: `${commOId} 에서 userId 인 ${userId} 중복이에요`},
          gkdErrCode: 'USERDB_CREATE_USER_DUPLICATE',
          gkdErrMsg: `userId 가 중복이에요`,
          gkdStatus: {commOId, userId},
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
  async createUserAdmin(where: string, dto: DTO.CreateUserAdminDTO) {
    /**
     * createUserAdmin
     * - 관리자 사이트의 계정생성 함수
     *
     * 입력값
     * - userId: string
     *     + 사용자 ID
     * - password: string
     *     + 사용자 비밀번호
     *
     * 출력값
     * - 없음
     *
     * 작동 순서
     * 1. userId 가 ADMIN_USER_ID 가 아닌지 확인
     * 2. 중복없는 userOId 생성
     * 3. 비밀번호 bcrypt 화
     * 4. 데이터베이스에 저장
     */

    const {userId, password} = dto
    const connection = await this.dbService.getConnection()
    let userOId = U.generateObjectId()

    try {
      // 1. userId 가 ADMIN_USER_ID 가 아닌지 확인
      if (userId !== ADMIN_USER_ID) {
        throw {
          gkd: {userId: `userId 가 ADMIN_USER_ID 가 아니에요`},
          gkdErrCode: 'USERDB_CREATE_USER_ADMIN_NOT_ADMIN_ID',
          gkdErrMsg: `userId 가 ADMIN_USER_ID 가 아니에요`,
          gkdStatus: {userId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 2. 중복없는 userOId 생성
      while (true) {
        const queryRead = 'SELECT userOId FROM users WHERE userOId = ?'
        const paramRead = [userOId]
        const [resultRows] = await connection.execute(queryRead, paramRead)
        const resultArray = resultRows as RowDataPacket[]
        if (resultArray.length === 0) break
        userOId = U.generateObjectId()
      }

      // 3. 비밀번호 bcrypt 화
      const hashedPassword = await bcrypt.hash(password, gkdSaltOrRounds)

      // 4. 데이터베이스에 저장
      const queryInsert = `INSERT INTO users (userOId, userId, hashedPassword, commAuth, commOId) VALUES (?, ?, ?, ?, ?)`
      const paramInsert = [userOId, userId, hashedPassword, AUTH_ADMIN, 'admin']
      await connection.execute(queryInsert, paramInsert)
      // ::
    } catch (errObj) {
      // ::
      if (errObj.errno === 1062) {
        throw {
          gkd: {duplicate: `userId 중복이에요`},
          gkdErrCode: 'USERDB_CREATE_USER_ADMIN_DUPLICATE',
          gkdErrMsg: `userId 중복이에요`,
          gkdStatus: {userId},
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

  async readUserArrByCommOId(where: string, commOId: string) {
    /**
     * readUserArrByCommOId
     * - 해당 공동체에 속한 유저들의 배열 읽기 함수
     *
     * 입력값
     * - commOId: string
     *     + 공동체의 OId
     *
     * 출력값
     * - userArr: T.UserType[]
     *     + 해당 공동체에 속한 유저들의 배열
     *
     * 작동 순서
     * 1. DB에서 해당 공동체에 속한 유저들의 배열 읽기
     * 2. 유저들의 배열 반환
     */

    const connection = await this.dbService.getConnection()

    try {
      // 1. DB에서 해당 공동체에 속한 유저들의 배열 읽기
      const queryRead = `
        SELECT userOId, userId, commAuth, commOId FROM users 
          WHERE commOId = ?
      `
      const paramRead = [commOId]
      const [resultRows] = await connection.execute(queryRead, paramRead)
      const resultArray = resultRows as RowDataPacket[]

      if (resultArray.length === 0) {
        return {userArr: []}
      }

      // 2. 유저들의 배열 반환
      const userArr: T.UserType[] = resultArray.map(row => {
        const elem: T.UserType = {
          userOId: row.userOId,
          userId: row.userId,
          commAuth: row.commAuth,
          commOId: row.commOId
        }
        return elem
      })

      return {userArr}
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
  async readUserByIdPw(where: string, userId: string, password: string) {
    /**
     * readUserByIdPw
     * - 해당 ID 비번의 유저 있나 췍!!
     *
     * 입력값
     * - userId: string
     *     + 입력받은 ID
     * - password: string
     *     + 입력받은 비밀번호
     *
     * 출력값
     * - User 타입 데이터
     *
     * 작동 순서
     * 1. DB에서 userId로 사용자 조회
     * 2. 사용자가 없으면 null
     * 3. 비밀번호 검증
     * 4. 비밀번호가 일치하지 않으면 null 반환
     * 5. 비밀번호가 일치하면 User 타입 데이터 반환
     */
    const connection = await this.dbService.getConnection()
    try {
      // 1. DB에서 userId로 사용자 조회
      const queryRead = 'SELECT userOId, userId, hashedPassword, commAuth, commOId FROM users WHERE userId = ?'
      const paramRead = [userId]
      const [resultRows] = await connection.execute(queryRead, paramRead)
      const resultArray = resultRows as RowDataPacket[]

      // 2. 사용자가 없으면 null
      if (resultArray.length === 0) {
        return {user: null}
      }

      const userData = resultArray[0]
      const {userOId, hashedPassword, commAuth, commOId} = userData

      // 3. 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, hashedPassword)

      // 4. 비밀번호가 일치하지 않으면 null 반환
      if (!isPasswordValid) {
        return {user: null}
      }

      // 5. 비밀번호가 일치하면 User 타입 데이터 반환
      const user: ST.UserType = {commAuth, commOId, userOId, userId}
      return {user}
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
  async readUserByUserOId(where: string, userOId: string) {
    const connection = await this.dbService.getConnection()
    try {
      const queryRead = 'SELECT userOId, userId, commAuth, commOId FROM users WHERE userOId = ?'
      const paramRead = [userOId]
      const [resultRows] = await connection.execute(queryRead, paramRead)
      const resultArray = resultRows as RowDataPacket[]

      if (resultArray.length === 0) {
        return {user: null}
      }

      const {userId, commAuth, commOId} = resultArray[0]

      const user: ST.UserType = {commAuth, commOId, userOId, userId}

      return {user}
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

  async updateUser(where: string, dto: DTO.UpdateUserDTO) {
    /**
     * updateUser
     * - 유저 정보 수정 함수
     *
     * 입력값
     * - userOId: string
     *     + 수정할 유저의 OId
     * - newUserId: string
     *     + 유저의 새로운 ID (비어있으면 바꾸지 않음)
     * - newPassword: string
     *     + 유저의 새로운 비밀번호 (비어있으면 바꾸지 않음)
     * - newCommAuth: number
     *     + 유저의 새로운 권한
     *
     * 작동 순서
     * 1. 업데이트할 필드 확인 및 쿼리 동적 생성
     * 2. newPassword가 있으면 bcrypt 해시화
     * 3. 데이터베이스 업데이트 실행
     */

    const {userOId, newUserId, newPassword, newCommAuth} = dto
    const connection = await this.dbService.getConnection()
    try {
      // 1. 업데이트할 필드 확인 및 쿼리 동적 생성
      const updateFields: string[] = []
      const updateParams: any[] = []

      // newUserId가 비어있지 않으면 업데이트
      if (newUserId && newUserId.trim() !== '') {
        updateFields.push('userId = ?')
        updateParams.push(newUserId)
      }

      // 2. newPassword가 있으면 bcrypt 해시화
      if (newPassword && newPassword.trim() !== '') {
        const hashedPassword = await bcrypt.hash(newPassword, gkdSaltOrRounds)
        updateFields.push('hashedPassword = ?')
        updateParams.push(hashedPassword)
      }

      // newCommAuth 업데이트
      if (newCommAuth !== undefined && newCommAuth !== null) {
        updateFields.push('commAuth = ?')
        updateParams.push(newCommAuth)
      }

      // 업데이트할 필드가 없으면 에러
      if (updateFields.length === 0) {
        throw {
          gkd: {noUpdate: '업데이트할 필드가 없어요'},
          gkdErrCode: 'USERDB_UPDATE_USER_NO_FIELDS',
          gkdErrMsg: '업데이트할 필드가 없어요',
          gkdStatus: {userOId},
          statusCode: 400,
          where
        } as T.ErrorObjType
      }

      // 3. 데이터베이스 업데이트 실행
      const queryUpdate = `UPDATE users SET ${updateFields.join(', ')} WHERE userOId = ?`
      updateParams.push(userOId)
      await connection.execute(queryUpdate, updateParams)

      // ::
    } catch (errObj) {
      // ::
      if (errObj.errno === 1062) {
        throw {
          gkd: {duplicate: `userId 중복이에요`},
          gkdErrCode: 'USERDB_UPDATE_USER_DUPLICATE',
          gkdErrMsg: `userId 중복이에요`,
          gkdStatus: {userOId, newUserId},
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
}
