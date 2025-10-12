import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {CheckJwtValidationGuard} from '@guard'

import {ClientAuthService} from './client.auth.service'

import * as HTTP from '@httpDataType'

@Controller('/client/auth')
export class ClientAuthController {
  constructor(private readonly clientAuthService: ClientAuthService) {}

  // POST AREA:

  @Post('/signIn')
  async signIn(@Body() data: HTTP.SignInDataType) {
    const {ok, body, gkdErrMsg, statusCode, jwtFromServer} = await this.clientAuthService.signIn(data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // GET AREA:

  @Get('/refreshToken')
  @UseGuards(CheckJwtValidationGuard)
  async refreshToken(@Headers() header: any) {
    const {jwtFromServer, jwtPayload} = header
    const {ok, body, gkdErrMsg, statusCode} = await this.clientAuthService.refreshToken(jwtPayload)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
