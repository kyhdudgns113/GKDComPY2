import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {AdminCommunityService} from './admin.community.service'

import {CheckAdminGuard} from '@commons/guards'

import * as HTTP from '@httpDataType'

@Controller('/admin/community')
export class AdminCommunityController {
  constructor(private readonly adminCommunityService: AdminCommunityService) {}

  // POST AREA:

  @Post('/addCommunity')
  @UseGuards(CheckAdminGuard)
  async addCommunity(@Headers() headers: any, @Body() data: HTTP.AddCommunityDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.addCommunity(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Post('/addCommUser')
  @UseGuards(CheckAdminGuard)
  async addCommUser(@Headers() headers: any, @Body() data: HTTP.AddCommUserDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.addCommUser(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // GET AREA:

  @Get('/loadCommArr')
  @UseGuards(CheckAdminGuard)
  async loadCommArr(@Headers() headers: any) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.loadCommArr(jwtPayload)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Get('/loadCommUserArr/:commOId')
  @UseGuards(CheckAdminGuard)
  async loadCommUserArr(@Headers() headers: any, @Param('commOId') commOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.loadCommUserArr(jwtPayload, commOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
