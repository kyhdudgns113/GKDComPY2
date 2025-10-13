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
}
