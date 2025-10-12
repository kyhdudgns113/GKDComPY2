import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {ClientCommService} from './client.comm.service'
import {CheckJwtValidationGuard} from '@guard'

@Controller('/client/community')
export class ClientCommController {
  constructor(private readonly clientServuce: ClientCommService) {}

  @Get('/loadCommunity/:commOId')
  @UseGuards(CheckJwtValidationGuard)
  async loadCommunity(@Headers() headers: any, @Param('commOId') commOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientServuce.loadCommunity(jwtPayload, commOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
