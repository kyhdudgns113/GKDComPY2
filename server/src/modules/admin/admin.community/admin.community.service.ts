import {AdminCommPortService} from '@modules/database'
import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'

import * as HTTP from '@httpDataType'
import * as U from '@util'

@Injectable()
export class AdminCommunityService {
  constructor(private readonly portService: AdminCommPortService) {}

  // POST AREA:

  async addCommunity(jwtPayload: JwtPayloadType, data: HTTP.AddCommunityDataType) {
    try {
      const {commArr} = await this.portService.addCommunity(jwtPayload, data)
      return {ok: true, body: {commArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addCommClub(jwtPayload: JwtPayloadType, data: HTTP.AddCommClubDataType) {
    try {
      const {clubArr} = await this.portService.addCommClub(jwtPayload, data)
      return {ok: true, body: {clubArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addCommUser(jwtPayload: JwtPayloadType, data: HTTP.AddCommUserDataType) {
    try {
      const {community} = await this.portService.addCommUser(jwtPayload, data)
      return {ok: true, body: {community}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // PUT AREA:

  async modifyCommUser(jwtPayload: JwtPayloadType, data: HTTP.ModifyCommUserDataType) {
    try {
      const {user} = await this.portService.modifyCommUser(jwtPayload, data)
      return {ok: true, body: {user}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // GET AREA:

  async loadCommArr(jwtPayload: JwtPayloadType) {
    try {
      const {commArr} = await this.portService.loadCommArr(jwtPayload)
      return {ok: true, body: {commArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async loadCommClubArr(jwtPayload: JwtPayloadType, commOId: string) {
    try {
      const {clubArr} = await this.portService.loadCommClubArr(jwtPayload, commOId)
      return {ok: true, body: {clubArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async loadCommUserArr(jwtPayload: JwtPayloadType, commOId: string) {
    try {
      const {userArr} = await this.portService.loadCommUserArr(jwtPayload, commOId)
      return {ok: true, body: {userArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // DELETE AREA:

  async deleteCommUser(jwtPayload: JwtPayloadType, userOId: string) {
    try {
      const {userArr} = await this.portService.deleteCommUser(jwtPayload, userOId)
      return {ok: true, body: {userArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
