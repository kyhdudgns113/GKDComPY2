import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {ClientCommService} from './client.comm.service'
import {CheckJwtValidationGuard} from '@guard'

@Controller('/client/community')
export class ClientCommController {
  constructor(private readonly clientServuce: ClientCommService) {}

  // GET AREA:

  @Get('/loadUsersCommunity')
  @UseGuards(CheckJwtValidationGuard)
  async loadUsersCommunity(@Headers() headers: any) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientServuce.loadUsersCommunity(jwtPayload)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
