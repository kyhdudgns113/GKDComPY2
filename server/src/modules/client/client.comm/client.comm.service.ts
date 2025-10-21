import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientCommPortService} from '@modules/database'

import * as HTTP from '@httpDataType'
import * as U from '@util'

@Injectable()
export class ClientCommService {
  constructor(private readonly portService: ClientCommPortService) {}

  // POST AREA:

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
      const {userArr} = await this.portService.addCommUser(jwtPayload, data)
      return {ok: true, body: {userArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // PUT AREA:

  async modifyCommClub(jwtPayload: JwtPayloadType, data: HTTP.ModifyCommClubDataType) {
    try {
      const {clubArr} = await this.portService.modifyCommClub(jwtPayload, data)
      return {ok: true, body: {clubArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async modifyCommUser(jwtPayload: JwtPayloadType, data: HTTP.ModifyCommUserDataType) {
    try {
      const {userArr} = await this.portService.modifyCommUser(jwtPayload, data)
      return {ok: true, body: {userArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // GET AREA:

  async loadUsersCommunity(jwtPayload: JwtPayloadType) {
    try {
      const {clubArr, community, commMemberArr, userArr} = await this.portService.loadUsersCommunity(jwtPayload)
      return {ok: true, body: {clubArr, community, commMemberArr, userArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
