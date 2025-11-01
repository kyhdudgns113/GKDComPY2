import {Injectable} from '@nestjs/common'
import {JwtPayloadType} from '@type'
import {ClientDocPortService} from '@modules/database'

import * as HTTP from '@httpDataType'
import * as U from '@util'

@Injectable()
export class ClientDocumentService {
  constructor(private readonly portService: ClientDocPortService) {}

  // PUT AREA:

  async modifyClubDocument(jwtPayload: JwtPayloadType, data: HTTP.ModifyClubDocDataType) {
    try {
      const {clubDoc} = await this.portService.modifyClubDocument(jwtPayload, data)
      return {ok: true, body: {clubDoc}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async modifyCommDocument(jwtPayload: JwtPayloadType, data: HTTP.ModifyCommDocDataType) {
    try {
      await this.portService.modifyCommDocument(jwtPayload, data)
      return {ok: true, body: {}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // GET AREA:

  async loadClubDocument(jwtPayload: JwtPayloadType, clubOId: string) {
    try {
      const {contents} = await this.portService.loadClubDocument(jwtPayload, clubOId)
      return {ok: true, body: {contents}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async loadCommDocument(jwtPayload: JwtPayloadType, commOId: string) {
    try {
      const {contents} = await this.portService.loadCommDocument(jwtPayload, commOId)
      return {ok: true, body: {contents}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
