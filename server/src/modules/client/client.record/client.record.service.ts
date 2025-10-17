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
