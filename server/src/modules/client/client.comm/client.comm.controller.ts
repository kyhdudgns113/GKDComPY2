import {Body, Controller, Get, Headers, Param, Post, Put, UseGuards} from '@nestjs/common'
import {ClientCommService} from './client.comm.service'
import {CheckJwtValidationGuard} from '@guard'

import * as HTTP from '@httpDataType'

@Controller('/client/community')
export class ClientCommController {
  constructor(private readonly clientServuce: ClientCommService) {}

  // POST AREA:

  @Post('/addCommUser')
  @UseGuards(CheckJwtValidationGuard)
  async addCommUser(@Headers() headers: any, @Body() data: HTTP.AddCommUserDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientServuce.addCommUser(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // PUT AREA:

  @Put('/modifyCommUser')
  @UseGuards(CheckJwtValidationGuard)
  async modifyCommUser(@Headers() headers: any, @Body() data: HTTP.ModifyCommUserDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientServuce.modifyCommUser(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // GET AREA:

  @Get('/loadUsersCommunity')
  @UseGuards(CheckJwtValidationGuard)
  async loadUsersCommunity(@Headers() headers: any) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientServuce.loadUsersCommunity(jwtPayload)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
