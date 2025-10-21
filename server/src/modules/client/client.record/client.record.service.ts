import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientRecordPortService} from '@modules/database'
import {GKDJwtService} from '@modules/gkdJwt'

import * as HTTP from '@httpDataType'
import * as T from '@type'
import * as U from '@util'

@Injectable()
export class ClientRecordService {
  constructor(
    private readonly jwtService: GKDJwtService,
    private readonly portService: ClientRecordPortService
  ) {}

  // POST AREA:

  async addNextWeek(jwtPayload: JwtPayloadType, data: HTTP.AddNextWeekDataType) {
    try {
      const {weekRowArr} = await this.portService.addNextWeek(jwtPayload, data)
      return {ok: true, body: {weekRowArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addPrevWeek(jwtPayload: JwtPayloadType, data: HTTP.AddPrevWeekDataType) {
    try {
      const {weekRowArr} = await this.portService.addPrevWeek(jwtPayload, data)
      return {ok: true, body: {weekRowArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addRowMember(jwtPayload: JwtPayloadType, data: HTTP.AddRowMemberDataType) {
    try {
      const {rowMemberArr} = await this.portService.addRowMember(jwtPayload, data)
      return {ok: true, body: {rowMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // GET AREA:

  async loadClubWeekRowArr(jwtPayload: JwtPayloadType, clubOId: string) {
    try {
      const {weekRowArr} = await this.portService.loadClubWeekRowArr(jwtPayload, clubOId)
      return {ok: true, body: {weekRowArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async loadMemberRecentRecord(jwtPayload: JwtPayloadType, memOId: string, _duration: string) {
    try {
      const duration = parseInt(_duration)
      const {dailyRecordArr} = await this.portService.loadMemberRecentRecord(jwtPayload, memOId, duration)
      return {ok: true, body: {dailyRecordArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async loadWeeklyRecordInfo(jwtPayload: JwtPayloadType, weekOId: string) {
    try {
      const {dailyRecordArr, dateInfoArr, rowMemberArr} = await this.portService.loadWeeklyRecordInfo(jwtPayload, weekOId)
      return {ok: true, body: {dailyRecordArr, dateInfoArr, rowMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // PUT AREA:

  async modifyDailyInfo(jwtPayload: JwtPayloadType, data: HTTP.ModifyDailyInfoDataType) {
    try {
      const {dateInfoArr} = await this.portService.modifyDailyInfo(jwtPayload, data)
      return {ok: true, body: {dateInfoArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async modifyRowMemberInfo(jwtPayload: JwtPayloadType, data: HTTP.ModifyRowMemberInfoDataType) {
    try {
      const {rowMemberArr} = await this.portService.modifyRowMemberInfo(jwtPayload, data)
      return {ok: true, body: {rowMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async modifyWeeklyInfo(jwtPayload: JwtPayloadType, data: HTTP.ModifyWeeklyInfoDataType) {
    try {
      const {weekRowArr} = await this.portService.modifyWeeklyInfo(jwtPayload, data)
      return {ok: true, body: {weekRowArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async writeDailyRecord(jwtPayload: JwtPayloadType, data: HTTP.WriteDailyRecordDataType) {
    try {
      const {dailyRecordArr} = await this.portService.writeDailyRecord(jwtPayload, data)
      return {ok: true, body: {dailyRecordArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // DELETE AREA:

  async removeWeekRow(jwtPayload: JwtPayloadType, weekOId: string) {
    try {
      const {weekRowArr} = await this.portService.removeWeekRow(jwtPayload, weekOId)
      return {ok: true, body: {weekRowArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
