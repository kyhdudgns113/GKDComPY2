import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {AdminAuthService} from './admin.auth.service'

import * as HTTP from '@httpDataType'
import {CheckJwtValidationGuard} from '@commons/guards'

@Controller('/admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  // POST AREA:

  @Post('/signIn')
  async signIn(@Body() data: HTTP.SignInDataType) {
    const {ok, body, gkdErrMsg, statusCode, jwtFromServer} = await this.adminAuthService.signIn(data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Post('/signUp')
  async signUp(@Body() data: HTTP.SignUpDataType) {
    const {ok, body, gkdErrMsg, statusCode} = await this.adminAuthService.signUp(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  // GET AREA:

  @Get('/refreshToken')
  @UseGuards(CheckJwtValidationGuard)
  async refreshToken(@Headers() header: any) {
    const {jwtFromServer, jwtPayload} = header
    const {ok, body, gkdErrMsg, statusCode} = await this.adminAuthService.refreshToken(jwtPayload)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
