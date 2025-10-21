import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientMemberPortService} from '@modules/database'
import {GKDJwtService} from '@modules/gkdJwt'

import * as HTTP from '@httpDataType'
import * as T from '@type'
import * as U from '@util'

@Injectable()
export class ClientMemberService {
  constructor(
    private readonly jwtService: GKDJwtService,
    private readonly portService: ClientMemberPortService
  ) {}

  // POST AREA:

  async addClubMember(jwtPayload: JwtPayloadType, data: HTTP.AddClubMemberDataType) {
    try {
      const {clubMemberArr} = await this.portService.addClubMember(jwtPayload, data)
      return {ok: true, body: {clubMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // PUT AREA:

  async modifyMemberCard(jwtPayload: JwtPayloadType, data: HTTP.ModifyMemberCardDataType) {
    try {
      const {memberDeck} = await this.portService.modifyMemberCard(jwtPayload, data)
      return {ok: true, body: {memberDeck}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async moveClubMember(jwtPayload: JwtPayloadType, data: HTTP.MoveClubMemberDataType) {
    try {
      const {clubMemberArr} = await this.portService.moveClubMember(jwtPayload, data)
      return {ok: true, body: {clubMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async saveClubMemberInfo(jwtPayload: JwtPayloadType, data: HTTP.SaveClubMemberInfoDataType) {
    try {
      const {clubMemberArr} = await this.portService.saveClubMemberInfo(jwtPayload, data)
      return {ok: true, body: {clubMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // GET AREA:

  async loadClubMemberArr(jwtPayload: JwtPayloadType, clubOId: string) {
    try {
      const {clubMemberArr} = await this.portService.loadClubMemberArr(jwtPayload, clubOId)
      return {ok: true, body: {clubMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async loadMemberDeck(jwtPayload: JwtPayloadType, memOId: string) {
    try {
      const {memberDeck} = await this.portService.loadMemberDeck(jwtPayload, memOId)
      return {ok: true, body: {memberDeck}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // DELETE AREA:

  async removeClubMember(jwtPayload: JwtPayloadType, clubOId: string, memOId: string) {
    try {
      const {clubMemberArr} = await this.portService.removeClubMember(jwtPayload, clubOId, memOId)
      return {ok: true, body: {clubMemberArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
