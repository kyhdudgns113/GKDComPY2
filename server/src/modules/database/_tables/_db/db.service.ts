import {Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common'
import {mysqlHost, mysqlID, mysqlPW, mysqlDB, mysqlTestDB, mysqlTestPW, mysqlTestID, mysqlTestHost, mysqlTestPort, mysqlPort} from '@secret'

import * as mysql from 'mysql2/promise'

@Injectable()
export class DBService implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool
  private isTest: boolean

  constructor(isTest?: boolean) {
    this.isTest = isTest ?? false

    if (isTest) {
      this.pool = mysql.createPool({
        host: mysqlTestHost,
        user: mysqlTestID,
        password: mysqlTestPW,
        database: mysqlTestDB,
        port: mysqlTestPort,
        waitForConnections: true,
        connectionLimit: 500, // 동시에 열 수 있는 연결 수 증가
        queueLimit: 500, // 대기열 제한 추가
        multipleStatements: true
      })
    }
  }

  async onModuleInit() {
    if (!this.isTest) {
      this.pool = mysql.createPool({
        host: mysqlHost,
        user: mysqlID,
        password: mysqlPW,
        database: mysqlDB,
        port: mysqlPort,
        waitForConnections: true,
        connectionLimit: 500, // 연결 수 증가
        queueLimit: 500, // 대기열 제한 추가
        multipleStatements: true,
        // 연결 풀 초과 시 에러 대신 대기하도록 설정
        idleTimeout: 3000000, // 50분
        maxIdle: 50, // 최대 유휴 연결 수
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
      })
    }

    // 풀 연결 테스트
    await this.pool.getConnection().then(conn => conn.release())
    console.log('\n    DB pool 성공적으로 연결!!  \n')
  }

  async onModuleDestroy() {
    await this.pool.end()
    console.log('\n  DB pool closed  \n')
  }

  /**
   * 풀 자체 반환
   */
  getPool() {
    return this.pool
  }

  /**
   * 커넥션 1개 얻기
   */
  async getConnection() {
    try {
      return await this.pool.getConnection()
      // ::
    } catch (error) {
      // ::
      console.error('getConnection 실패:', error.message)
      throw error
    }
  }
}
