import {Body, Controller, Get, Headers, Param, Post, Put, UseGuards} from '@nestjs/common'
import {CheckJwtValidationGuard} from '@guard'
import {ClientDocumentService} from './client.document.service'

import * as HTTP from '@httpDataType'

@Controller('/client/document')
export class ClientDocumentController {
  constructor(private readonly clientDocumentService: ClientDocumentService) {}

  // PUT AREA:

  @Put('/modifyClubDocument')
  @UseGuards(CheckJwtValidationGuard)
  async modifyClubDocument(@Headers() headers: any, @Body() data: HTTP.ModifyClubDocDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientDocumentService.modifyClubDocument(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // GET AREA:

  @Get('/loadClubDocument/:clubOId')
  @UseGuards(CheckJwtValidationGuard)
  async loadClubDocument(@Headers() headers: any, @Param('clubOId') clubOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientDocumentService.loadClubDocument(jwtPayload, clubOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
